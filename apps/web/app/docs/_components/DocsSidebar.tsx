"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "./nav-config";

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0 py-10">
      <div className="sticky top-28 overflow-y-auto max-h-[calc(100vh-120px)] pr-4 custom-scrollbar">
        <nav className="space-y-8">
          {docsNav.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-white text-sm mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-sm transition-colors flex items-center gap-2 ${
                          active
                            ? "text-purple-400 font-medium -ml-[17px] border-l-2 border-purple-500 pl-4"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
