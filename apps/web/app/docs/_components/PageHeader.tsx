// PageHeader.tsx
export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-lg text-[#e5e5e5]/80 leading-relaxed">{description}</p>
    </div>
  );
}
