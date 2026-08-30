export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-neutral-text-primary mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-lg text-neutral-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
