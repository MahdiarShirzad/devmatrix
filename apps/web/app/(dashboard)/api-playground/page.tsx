"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Folder,
  Plus,
  Search,
  Zap,
  MoreVertical,
  X,
  Edit2,
  Trash2,
  Copy,
} from "lucide-react";

const COLLECTIONS = [
  {
    id: "coll_1",
    name: "devmatrix-core",
    requestCount: 32,
    lastUsed: "Just now",
    env: "Local",
    envColor:
      "text-neutral-text-secondary bg-neutral-surface-2 border-neutral-border",
  },
  {
    id: "coll_2",
    name: "my-trip-full",
    requestCount: 18,
    lastUsed: "2h ago",
    env: "Development",
    envColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
  },
  {
    id: "coll_3",
    name: "deep-coding-backend",
    requestCount: 45,
    lastUsed: "1d ago",
    env: "Production",
    envColor: "text-success bg-success-bg border-success/20",
  },
];

export default function ApiPlaygroundPage() {
  // UI States (فقط برای نمایش فرم‌ها و منوها)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] =
    useState(false);
  const [isQuickRequestModalOpen, setIsQuickRequestModalOpen] = useState(false);

  // بستن منوی کشویی وقتی جای دیگری کلیک شد
  const handleToggleDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div
      className="flex h-full flex-col"
      onClick={() => setActiveDropdown(null)}
    >
      {/* هدر و اکشن‌ها */}
      <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            API Playground
          </h1>
          <p className="mt-1.5 text-sm text-neutral-text-secondary">
            Manage your workspaces, collections, and HTTP requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsQuickRequestModalOpen(true)}
            className="group flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:border-brand-primary/50 hover:bg-neutral-surface-2"
          >
            <Zap
              size={16}
              className="text-brand-highlight group-hover:animate-pulse"
            />
            Quick Request
          </button>
          <button
            type="button"
            onClick={() => setIsNewCollectionModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
          >
            <Plus size={16} />
            New Collection
          </button>
        </div>
      </div>

      {/* نوار ابزار و جستجو */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
          />
          <input
            type="text"
            placeholder="Filter collections..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <div className="hidden text-sm font-medium text-neutral-text-secondary md:block">
          {COLLECTIONS.length} Collections
        </div>
      </div>

      {/* گرید کالکشن‌ها */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <div
            key={collection.id}
            className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <Folder size={20} strokeWidth={2} />
                </div>
                <div>
                  <Link
                    href={`/api-playground/${collection.id}`}
                    className="text-base font-semibold text-neutral-text-primary before:absolute before:inset-0 focus:outline-none"
                  >
                    {collection.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-neutral-text-secondary">
                    <span>{collection.requestCount} requests</span>
                    <span>•</span>
                    <span>{collection.lastUsed}</span>
                  </div>
                </div>
              </div>

              {/* منوی تنظیمات کالکشن */}
              <div className="relative z-10">
                <button
                  onClick={(e) => handleToggleDropdown(e, collection.id)}
                  className="rounded-md p-1.5 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                >
                  <MoreVertical size={16} />
                </button>

                {/* دراپ‌داون */}
                {activeDropdown === collection.id && (
                  <div className="absolute right-0 top-full mt-1 w-36 overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-xl animate-in fade-in zoom-in-95 duration-100">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-text-primary transition-colors hover:bg-neutral-surface-2">
                      <Edit2 size={14} /> Rename
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-text-primary transition-colors hover:bg-neutral-surface-2">
                      <Copy size={14} /> Duplicate
                    </button>
                    <div className="h-px bg-neutral-border"></div>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-error transition-colors hover:bg-error/10">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center border-t border-neutral-border pt-4">
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${collection.envColor}`}
              >
                {collection.env}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================= */}
      {/* مودال New Collection (فقط UI) */}
      {/* ========================================= */}
      {isNewCollectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-text-primary">
                Create New Collection
              </h2>
              <button
                onClick={() => setIsNewCollectionModalOpen(false)}
                className="text-neutral-text-secondary hover:text-neutral-text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
                  Collection Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Authentication API"
                  className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
                  Environment
                </label>
                <select className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none appearance-none">
                  <option>Local</option>
                  <option>Development</option>
                  <option>Production</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsNewCollectionModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md">
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* مودال Quick Request (فقط UI) */}
      {/* ========================================= */}
      {isQuickRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-text-primary flex items-center gap-2">
                <Zap size={18} className="text-brand-highlight" />
                Quick Request
              </h2>
              <button
                onClick={() => setIsQuickRequestModalOpen(false)}
                className="text-neutral-text-secondary hover:text-neutral-text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-neutral-text-secondary mb-4">
              Test an endpoint quickly without saving it to a collection.
            </p>

            <div className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 p-1">
              <select className="appearance-none rounded-md bg-transparent py-2 pl-3 pr-6 text-sm font-bold text-success focus:outline-none cursor-pointer hover:bg-neutral-surface-1 transition-colors">
                <option className="text-success">GET</option>
                <option className="text-brand-accent">POST</option>
                <option className="text-warning">PUT</option>
                <option className="text-error">DELETE</option>
              </select>
              <div className="h-6 w-px bg-neutral-border"></div>
              <input
                type="text"
                placeholder="https://api.example.com/v1/..."
                className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none placeholder:font-sans placeholder:text-neutral-text-secondary/50"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsQuickRequestModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md">
                Open in Playground
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
