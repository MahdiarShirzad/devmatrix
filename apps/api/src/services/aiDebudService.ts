import AppError from "../utils/appError.js";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

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
Respond ONLY with a valid JSON object with exactly these keys: "title", "explanation", "fixedCode". No markdown fences, no extra text.`;

export async function analyzeCode(
  input: AnalyzeCodeInput,
): Promise<AnalyzeCodeResult> {
  const apiKey = process.env.AI_DEBUG_GROQ_API_KEY;
  console.log(process.env.AI_DEBUG_GROQ_API_KEY);
  if (!apiKey) {
    throw new AppError("AI Debug service is not configured", 500);
  }

  const userPrompt = buildUserPrompt(input);

  let response: Response;
  try {
    response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err) {
    throw new AppError("AI service is unavailable, please try again", 502);
  }

  if (!response.ok) {
    console.error("Groq API error:", response.status, await response.text());
    throw new AppError("AI service failed to process the request", 502);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;

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
