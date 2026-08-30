"use client";

import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  onToggle: () => void;
}

export default function MobileHeader({
  isMobileMenuOpen,
  onToggle,
}: MobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-neutral-text-primary">Settings</h1>
      <button
        onClick={onToggle}
        className="p-2 bg-neutral-surface-2 rounded-lg border border-neutral-border text-neutral-text-primary hover:bg-neutral-surface-2/70 transition-colors"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
