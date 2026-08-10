"use client";

import BackToSessionsButton from "./_components/BackToSessionsButton";
import NewSessionHeader from "./_components/NewSessionHeader";
import LanguageSelectField from "./_components/LanguageSelectField";
import CodeInputField from "./_components/CodeInputField";
import DescriptionField from "./_components/DescriptionField";
import SubmitSection from "./_components/SubmitSection";
import { useNewDebugForm } from "./_components/useNewDebugForm";

export default function NewDebugSessionPage() {
  const {
    register,
    code,
    setCode,
    description,
    setDescription,
    handleSubmit,
    handleBack,
    isSubmitDisabled,
    submitError,
  } = useNewDebugForm();

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <BackToSessionsButton onClick={handleBack} />
      <NewSessionHeader />

      <div className="rounded-2xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-sm sm:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <LanguageSelectField register={register} />
          <CodeInputField value={code} onChange={setCode} />
          <DescriptionField
            value={description ?? ""}
            onChange={setDescription}
          />
          {submitError && (
            <p className="text-sm text-error">{submitError.message}</p>
          )}
          <SubmitSection disabled={isSubmitDisabled} />
        </form>
      </div>
    </div>
  );
}
