"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateDebugSession } from "@/hooks/useAiDebug";

import { LANGUAGES } from "./constants";
import {
  CreateDebugSessionFormValues,
  createDebugSessionSchema,
} from "@/lib/ai-debug.schemas";

export function useNewDebugForm() {
  const { projectId } = useParams<{ projectId: string }>();

  const router = useRouter();
  const createSession = useCreateDebugSession(projectId);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<CreateDebugSessionFormValues>({
    resolver: zodResolver(createDebugSessionSchema),
    mode: "onChange",
    defaultValues: {
      language: LANGUAGES[0],
      sourceCode: "",
      userDescription: "",
    },
  });

  const code = watch("sourceCode");
  const description = watch("userDescription");

  const onSubmit = handleFormSubmit(
    async (values) => {
      try {
        const { session } = await createSession.mutateAsync(values);
        router.push(`/projects/${projectId}/ai-debug/${session._id}`);
      } catch {
        // The mutation error is surfaced to the user via `submitError`.
      }
    },
    () => {
      // Field-level validation errors are surfaced through `errors`.
    },
  );

  const handleBack = () => {
    router.push(`/projects/${projectId}/ai-debug`);
  };

  return {
    register,
    errors,
    code,
    setCode: (value: string) =>
      setValue("sourceCode", value, { shouldValidate: true }),
    description,
    setDescription: (value: string) => setValue("userDescription", value),
    handleSubmit: onSubmit,
    handleBack,
    isSubmitDisabled: !isValid || createSession.isPending,
    isSubmitting: createSession.isPending,
    submitError: createSession.error,
  };
}
