"use client";

import { Copy, Check, MoreVertical } from "lucide-react";
import { API_KEYS } from "./api-keys-data";

interface ApiKeysTableProps {
  copiedKey: string | null;
  onCopy: (text: string, id: string) => void;
}

export default function ApiKeysTable({ copiedKey, onCopy }: ApiKeysTableProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D1117] overflow-hidden">
      <table className="w-full text-left text-sm text-[#e5e5e5]/80">
        <thead className="bg-white/5 text-xs uppercase text-[#e5e5e5]/40 border-b border-white/10">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Token</th>
            <th className="px-6 py-4 font-medium">Created</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {API_KEYS.map((key) => (
            <tr
              key={key.id}
              className="transition-colors hover:bg-white/[0.02]"
            >
              <td className="px-6 py-4 font-medium text-white">{key.name}</td>
              <td className="px-6 py-4 font-mono text-[#e5e5e5]/60">
                {key.token}
              </td>
              <td className="px-6 py-4">{key.date}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onCopy(key.token, key.id)}
                    className="p-2 text-[#e5e5e5]/60 hover:text-white transition-colors rounded-md hover:bg-white/10"
                    title="Copy Key"
                  >
                    {copiedKey === key.id ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <button
                    className="p-2 text-[#e5e5e5]/60 hover:text-red-400 transition-colors rounded-md hover:bg-white/10"
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
