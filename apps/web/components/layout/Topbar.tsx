import { Search, Bell, Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-border bg-neutral-bg/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2 flex-1">
        {/* دکمه منوی موبایل */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-neutral-text-secondary hover:bg-neutral-surface-1 hover:text-neutral-text-primary md:hidden"
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* دکمه Command Palette (Fake Input) */}
        <button className="group flex w-full max-w-md items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-1.5 text-sm text-neutral-text-secondary transition-all hover:border-brand-primary/50 hover:bg-neutral-surface-2 hover:text-neutral-text-primary">
          <Search size={16} className="shrink-0" />
          <span className="flex-1 text-left">
            Search commands, projects, files...
          </span>
          <kbd className="hidden h-5 items-center gap-1 rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* نوتیفیکیشن‌ها */}
        <button
          type="button"
          className="relative rounded-full p-1.5 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
        >
          <Bell size={18} />
          {/* نشانگر نوتیفیکیشن خوانده نشده */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-highlight ring-2 ring-neutral-bg"></span>
        </button>

        {/* پروفایل کاربر */}
        <div className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-border bg-neutral-surface-1 py-1 pl-1 pr-3 transition-colors hover:border-brand-primary/50">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary">
            MS
          </div>
          <span className="hidden text-sm font-medium text-neutral-text-primary sm:block">
            Mahdiar
          </span>
        </div>
      </div>
    </header>
  );
}
