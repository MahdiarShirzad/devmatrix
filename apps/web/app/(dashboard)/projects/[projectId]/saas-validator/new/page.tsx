import BackToIdeasButton from "./_components/BackToIdeasButton";
import NewIdeaFormHeader from "./_components/NewIdeaFormHeader";
import NewIdeaForm from "./_components/NewIdeaForm";

export default function NewIdeaPage() {
  return (
    <div className="mx-auto max-w-2xl pb-8">
      <BackToIdeasButton />

      <div className="overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
        <NewIdeaFormHeader />
        <NewIdeaForm />
      </div>
    </div>
  );
}
