import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-bg">
      {/* Branding side - hidden on mobile */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-primary/20 via-neutral-bg to-brand-accent/10 p-10 lg:flex">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="DevMatrix" width={28} height={28} />
          <span className="text-lg font-medium text-neutral-text-primary">
            DevMatrix
          </span>
        </div>

        <div className="max-w-sm">
          <h1 className="text-2xl font-medium text-neutral-text-primary">
            One workspace for every stage of building.
          </h1>
          <p className="mt-3 text-sm text-neutral-text-secondary">
            Debug with AI, track your team&apos;s activity, test APIs, and
            validate your next idea — all in one place.
          </p>
        </div>

        <p className="text-xs text-neutral-text-secondary">
          © {new Date().getFullYear()} DevMatrix
        </p>
      </div>

      {/* Form side */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
