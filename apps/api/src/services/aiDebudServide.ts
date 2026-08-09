import AppError from "../utils/appError.js";

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

interface AnalyzeCodeInput {
  language: string;
  sourceCode: string;
  userDescription?: string;
}

interface AnalyzeCodeResult {
  title: string;
  explanation: string;
  fixedCode: string;
}

const SYSTEM_INSTRUCTION = `You are an expert code debugging assistant.
Given a code snippet, its language, and an optional user description of the problem, you must:
1. Identify the bug or issue.
2. Explain it clearly in plain language.
3. Provide the corrected version of the full code.
4. Generate a short, descriptive title (max 10 words) summarizing the issue, in the style of a bug tracker ticket title.
Respond ONLY with valid JSON matching the required schema. Do not include markdown code fences or any extra text.`;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    explanation: { type: "STRING" },
    fixedCode: { type: "STRING" },
  },
  required: ["title", "explanation", "fixedCode"],
};

export async function analyzeCode(
  input: AnalyzeCodeInput,
): Promise<AnalyzeCodeResult> {
  const apiKey = process.env.AI_DEBUG_GEMINI_API_KEY;
  if (!apiKey) {
    throw new AppError("AI Debug service is not configured", 500);
  }

  const userPrompt = buildUserPrompt(input);

  let response: Response;
  try {
    response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.3,
        },
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err) {
    throw new AppError("AI service is unavailable, please try again", 502);
  }

  if (!response.ok) {
    console.error("Gemini API error:", response.status, await response.text());
    throw new AppError("AI service failed to process the request", 502);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new AppError("AI service returned an empty response", 502);
  }

  let parsed: AnalyzeCodeResult;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new AppError("AI service returned an invalid response", 502);
  }

  if (!parsed.title || !parsed.explanation || !parsed.fixedCode) {
    throw new AppError("AI service returned an incomplete response", 502);
  }

  return parsed;
}

function buildUserPrompt({
  language,
  sourceCode,
  userDescription,
}: AnalyzeCodeInput): string {
  return [
    `Language: ${language}`,
    userDescription
      ? `User's description of the problem: ${userDescription}`
      : null,
    `Code:\n\`\`\`${language}\n${sourceCode}\n\`\`\``,
  ]
    .filter(Boolean)
    .join("\n\n");
}
