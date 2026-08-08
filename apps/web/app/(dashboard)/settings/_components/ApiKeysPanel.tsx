"use client";

import { useState } from "react";
import ApiKeysHeader from "./ApiKeysHeader";
import ApiKeysTable from "./ApiKeysTable";

export default function ApiKeysPanel() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ApiKeysHeader />
      <ApiKeysTable copiedKey={copiedKey} onCopy={handleCopy} />
    </div>
  );
}
