import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-bg px-6 text-center">
      {/* 
        المان تزئینی پس‌زمینه: عدد 404 با استایل توخالی یا بسیار کم‌رنگ 
        برای ایجاد عمق و حس مدرن بودن
      */}
      <div className="absolute flex items-center justify-center pointer-events-none select-none">
        <span className="text-[15rem] font-black leading-none text-brand-primary/[0.03]">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* کانتینر لوگو با یک بوردر ظریف */}
        <div className="mb-8 rounded-2xl border border-neutral-border bg-neutral-surface-1 p-4 shadow-xl">
          <Image
            src="/logo.png"
            alt="DevMatrix"
            width={72}
            height={72}
            className="rounded-xl"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-text-primary sm:text-4xl">
          System Exception: Route Not Found
        </h1>

        <p className="mt-4 max-w-md text-base text-neutral-text-secondary leading-relaxed">
          The requested resource could not be located in the current workspace.
          Please verify your routing path or return to the main console.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-3 text-sm font-medium text-brand-surface shadow-lg transition-all hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
        >
          <ArrowLeft size={18} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
