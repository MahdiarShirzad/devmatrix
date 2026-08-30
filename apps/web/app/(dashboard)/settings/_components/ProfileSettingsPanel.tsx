import { useMemo, useState } from "react";
import ProfileIdentityCard from "./ProfileIdentityCard";
import ProfileFields from "./ProfileFields";
import DangerZone from "./DangerZone";
import StickyActionBar from "./StickyActionBar";
import { User } from "@/types/user";

interface ProfileSettingsPanelProps {
  currentUser?: User;
}

export default function ProfileSettingsPanel({
  currentUser,
}: ProfileSettingsPanelProps) {
  // Initialize state directly from props - this is the correct pattern
  const [displayName, setDisplayName] = useState(currentUser?.name ?? "");
  const [savedSnapshot, setSavedSnapshot] = useState({
    displayName: currentUser?.name ?? "",
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success">(
    "idle",
  );

  const isDirty = useMemo(
    () => displayName !== savedSnapshot.displayName,
    [displayName, savedSnapshot],
  );

  const handleSave = async () => {
    if (saveState === "saving") return;

    setSaveState("saving");
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSavedSnapshot({ displayName });
    setSaveState("success");
    setTimeout(() => setSaveState("idle"), 1500);
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
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Profile
            </h1>
            <p className="mt-2 text-sm text-[#e5e5e5]/60">
              Manage how your identity appears across DevMatrix.
            </p>
          </header>

          {/* Identity Card */}
          <ProfileIdentityCard
            key={currentUser?.id} // Remount when user changes
            currentUser={currentUser}
          />

          {/* Personal Information */}
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-[#e5e5e5]/50">
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
            <DangerZone currentUser={currentUser} />
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
    </div>
  );
}
