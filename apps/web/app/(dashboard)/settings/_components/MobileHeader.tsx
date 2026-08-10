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
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <button
        onClick={onToggle}
        className="p-2 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
