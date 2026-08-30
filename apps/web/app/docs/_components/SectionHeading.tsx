import { Hash } from "lucide-react";
import type { ReactNode } from "react";

export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-2xl font-semibold text-neutral-text-primary mt-12 mb-6 flex items-center group cursor-pointer scroll-mt-28"
    >
      {children}
      <Hash
        size={18}
        className="ml-2 opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
      />
    </h2>
  );
}
