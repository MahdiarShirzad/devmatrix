"use client";

import { useState } from "react";
import MobileHeader from "./MobileHeader";
import SettingsSidebar from "./SettingsSidebar";
import ContentHeader from "./ContentHeader";
import ProfileSettingsPanel from "./ProfileSettingsPanel";
import ApiKeysPanel from "./ApiKeysPanel";
import GithubSettingsPanel from "./GithubSettingsPanel";
import AppearanceSettingsPanel from "./AppearanceSettingsPanel";
import ComingSoonPlaceholder from "./ComingSoonPlaceholder";
import { useMe } from "@/hooks/useMe";

const KNOWN_TABS = ["profile", "api-keys", "github", "appearance"];

export default function SettingsPageClient() {
  const { data: currentUser } = useMe();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary font-sans selection:bg-brand-primary/30 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="flex flex-col md:flex-row gap-10">
          <SettingsSidebar
            activeTab={activeTab}
            isMobileMenuOpen={isMobileMenuOpen}
            onSelectTab={handleSelectTab}
          />

          <main className="flex-1 min-w-0 pb-20">
            <ContentHeader
              activeTab={activeTab}
              isSaving={isSaving}
              onSave={handleSave}
            />

            <div className="max-w-4xl">
              {activeTab === "profile" && (
                <ProfileSettingsPanel currentUser={currentUser} />
              )}
              {activeTab === "api-keys" && <ApiKeysPanel />}
              {activeTab === "github" && <GithubSettingsPanel />}
              {activeTab === "appearance" && <AppearanceSettingsPanel />}

              {!KNOWN_TABS.includes(activeTab) && (
                <ComingSoonPlaceholder tabLabel={activeTab.replace("-", " ")} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
