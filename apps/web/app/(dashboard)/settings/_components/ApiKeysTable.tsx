"use client";

import { Copy, Check, MoreVertical } from "lucide-react";
import { API_KEYS } from "./api-keys-data";

interface ApiKeysTableProps {
  copiedKey: string | null;
  onCopy: (text: string, id: string) => void;
}

export default function ApiKeysTable({ copiedKey, onCopy }: ApiKeysTableProps) {
  return (
    <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 overflow-hidden">
      <table className="w-full text-left text-sm text-neutral-text-secondary">
        <thead className="bg-neutral-surface-2/50 text-xs uppercase text-neutral-text-secondary/40 border-b border-neutral-border">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Token</th>
            <th className="px-6 py-4 font-medium">Created</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-border/50">
          {API_KEYS.map((key) => (
            <tr
              key={key.id}
              className="transition-colors hover:bg-neutral-surface-2/30"
            >
              <td className="px-6 py-4 font-medium text-neutral-text-primary">
                {key.name}
              </td>
              <td className="px-6 py-4 font-mono text-neutral-text-secondary/60">
                {key.token}
              </td>
              <td className="px-6 py-4">{key.date}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onCopy(key.token, key.id)}
                    className="p-2 text-neutral-text-secondary/60 hover:text-neutral-text-primary transition-colors rounded-md hover:bg-neutral-surface-2"
                    title="Copy Key"
                  >
                    {copiedKey === key.id ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <button
                    className="p-2 text-neutral-text-secondary/60 hover:text-error transition-colors rounded-md hover:bg-neutral-surface-2"
                    title="Revoke"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
