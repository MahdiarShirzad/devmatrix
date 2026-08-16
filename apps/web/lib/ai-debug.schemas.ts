import { LANGUAGES } from "@/app/(dashboard)/projects/[projectId]/ai-debug/new/_components/constants";
import { z } from "zod";

export const createDebugSessionSchema = z.object({
  language: z.enum(LANGUAGES),
  sourceCode: z
    .string()
    .min(1, "کد نمی‌تواند خالی باشد")
    .max(20000, "کد بیش از حد طولانی است"),
  userDescription: z.string().max(2000).optional(),
});

export type CreateDebugSessionFormValues = z.infer<
  typeof createDebugSessionSchema
>;
