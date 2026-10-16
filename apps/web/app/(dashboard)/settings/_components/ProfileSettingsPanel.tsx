import { useMemo, useState } from "react";
import ProfileIdentityCard from "./ProfileIdentityCard";
import ProfileFields from "./ProfileFields";
import DangerZone from "./DangerZone";
import StickyActionBar from "./StickyActionBar";
import { User } from "@/types/user";
import { useUpdateProfile } from "@/hooks/useAuth";

interface ProfileSettingsPanelProps {
  currentUser?: User;
}

export default function ProfileSettingsPanel({
  currentUser,
}: ProfileSettingsPanelProps) {
  const [displayName, setDisplayName] = useState(currentUser?.name ?? "");
  const [savedSnapshot, setSavedSnapshot] = useState({
    displayName: currentUser?.name ?? "",
  });
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  const updateProfile = useUpdateProfile();

  const isDirty = useMemo(
    () => displayName !== savedSnapshot.displayName,
    [displayName, savedSnapshot],
  );

  const handleSave = () => {
    if (saveState === "saving") return;

    setSaveState("saving");
    updateProfile.mutate(
      { name: displayName },
      {
        onSuccess: () => {
          setSavedSnapshot({ displayName });
          setSaveState("success");
          setTimeout(() => setSaveState("idle"), 1500);
        },
        onError: () => {
          setSaveState("error");
        },
      },
    );
  };

  const handleCancel = () => {
    setDisplayName(savedSnapshot.displayName);
  };

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-2xl px-4 pb-32 pt-12 sm:px-6 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Page Header */}
          <header className="mb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-text-primary">
              Profile
            </h1>
            <p className="mt-2 text-sm text-neutral-text-secondary">
              Manage how your identity appears across DevMatrix.
            </p>
          </header>

          {/* Identity Card */}
          <ProfileIdentityCard
            key={currentUser?.id}
            currentUser={currentUser}
          />

          {/* Personal Information */}
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-neutral-text-primary">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-neutral-text-secondary/50">
                Update your profile details and email preferences.
              </p>
            </div>

            <ProfileFields
              displayName={displayName}
              email={currentUser?.email ?? ""}
              onDisplayNameChange={setDisplayName}
            />
          </section>

          {/* Danger Zone */}
          <div className="mt-24">
            <DangerZone />
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar
        visible={isDirty}
        saving={saveState === "saving"}
        success={saveState === "success"}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {saveState === "error" && (
        <div className="fixed bottom-24 left-0 right-0 z-50 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            Couldn&apos;t save your changes. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
