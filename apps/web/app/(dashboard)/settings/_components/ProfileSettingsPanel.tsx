import AvatarSection from "./AvatarSection";
import ProfileFields from "./ProfileFields";
import DangerZone from "./DangerZone";
import { User } from "@/types/user";

interface ProfileSettingsPanelProps {
  currentUser?: User;
}

export default function ProfileSettingsPanel({
  currentUser,
}: ProfileSettingsPanelProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AvatarSection currentUser={currentUser} />
      <div className="h-px w-full bg-white/10" />
      <ProfileFields currentUser={currentUser} />
      <div className="h-px w-full bg-white/10" />
      <DangerZone currentUser={currentUser} />
    </div>
  );
}
