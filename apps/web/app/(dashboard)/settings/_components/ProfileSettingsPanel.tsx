import AvatarSection from "./AvatarSection";
import ProfileFields from "./ProfileFields";
import DangerZone from "./DangerZone";

export default function ProfileSettingsPanel() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AvatarSection />
      <div className="h-px w-full bg-white/10" />
      <ProfileFields />
      <div className="h-px w-full bg-white/10" />
      <DangerZone />
    </div>
  );
}
