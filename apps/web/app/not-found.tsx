import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-bg px-6 text-center">
      <Image src="/logo.png" alt="DevMatrix" width={80} height={80} />

      <p className="mt-8 text-9xl font-extrabold font-medium text-brand-primary">
        404
      </p>
      <h1 className="mt-2 text-2xl font-medium text-neutral-text-primary">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-text-secondary">
        The page you&apos;re looking for may have been moved or never existed.
        Check the URL, or head back to your dashboard.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>
    </div>
  );
}
