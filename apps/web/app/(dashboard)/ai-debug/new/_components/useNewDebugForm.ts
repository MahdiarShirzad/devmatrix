"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function useNewDebugForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/ai-debug/sess_new");
  };

  const handleBack = () => {
    router.push("/ai-debug");
  };

  return {
    code,
    setCode,
    description,
    setDescription,
    handleSubmit,
    handleBack,
    isSubmitDisabled: !code.trim(),
  };
}
