import BackToIdeasLink from "./_components/BackToIdeasLink";
import SettingsHeader from "./_components/SettingsHeader";
import ValidatorSettingsForm from "./_components/ValidatorSettingsForm";

export default function ValidatorSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl pb-8">
      <BackToIdeasLink />
      <SettingsHeader />
      <ValidatorSettingsForm />
    </div>
  );
}
