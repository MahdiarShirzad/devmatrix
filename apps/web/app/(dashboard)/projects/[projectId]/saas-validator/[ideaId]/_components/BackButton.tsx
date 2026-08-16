import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/saas-validator"
      className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
    >
      <ArrowLeft
        size={16}
        className="transition-transform group-hover:-translate-x-1"
      />
      Back to ideas
    </Link>
  );
}
