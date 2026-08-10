"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateDebugSession } from "@/hooks/useAiDebug";

import { LANGUAGES } from "./constants";
import {
  CreateDebugSessionFormValues,
  createDebugSessionSchema,
} from "@/lib/ai-debug.schemas";

export function useNewDebugForm() {
  const router = useRouter();
  const createSession = useCreateDebugSession();

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
      console.log("SUBMIT FIRED with values:", values); // این باید همیشه چاپ بشه
      try {
        const { session } = await createSession.mutateAsync(values);
        router.push(`/ai-debug/${session._id}`);
      } catch (err) {
        console.error("SUBMIT FAILED:", err); // خطای واقعی اینجا میفته
      }
    },
    (validationErrors) => {
      console.log("VALIDATION FAILED:", validationErrors); // اگه zod رد کنه، اینجا چاپ میشه
    },
  );

  const handleBack = () => {
    router.push("/ai-debug");
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
