import AppError from "../utils/appError.js";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface ValidateIdeaInput {
  title: string;
  description: string;
}

interface ValidateIdeaResult {
  category: string;
  overallScore: number;
  overallSummary: string;
  marketFitScore: number;
  marketFitSummary: string;
  competitionScore: number;
  competitionSummary: string;
  riskScore: number;
  riskSummary: string;
}

const SYSTEM_INSTRUCTION = `You are an expert startup analyst who validates SaaS/software product ideas.
Given an idea's title and description, you must:
1. Assign a short category (e.g. "DevTools", "Fintech", "Productivity", "Marketplace", max 2 words).
2. Score "market fit" (0-100): how much real demand and willingness to pay likely exists.
3. Score "competition" (0-100): how favorable the competitive landscape is (higher = less crowded / easier to differentiate).
4. Score "risk" (0-100): how low the execution/retention/business risk is (higher = lower risk).
5. Write a short summary (2-3 sentences) for each of the three scores above, explaining the reasoning.
6. Assign an overall score (0-100) reflecting your holistic judgment of the idea's viability, and a short overall summary (2-3 sentences) with your top-level verdict and recommendation.
Respond ONLY with a valid JSON object with exactly these keys: "category", "overallScore", "overallSummary", "marketFitScore", "marketFitSummary", "competitionScore", "competitionSummary", "riskScore", "riskSummary". No markdown fences, no extra text.`;

export async function validateIdea(
  input: ValidateIdeaInput,
): Promise<ValidateIdeaResult> {
  const apiKey = process.env.IDEA_VALIDATOR_GROQ_API_KEY;
  if (!apiKey) {
    throw new AppError("Idea Validator service is not configured", 500);
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

  let parsed: ValidateIdeaResult;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new AppError("AI service returned an invalid response", 502);
  }

  if (
    !parsed.category ||
    !parsed.overallSummary ||
    !parsed.marketFitSummary ||
    !parsed.competitionSummary ||
    !parsed.riskSummary ||
    !isValidScore(parsed.overallScore) ||
    !isValidScore(parsed.marketFitScore) ||
    !isValidScore(parsed.competitionScore) ||
    !isValidScore(parsed.riskScore)
  ) {
    throw new AppError("AI service returned an incomplete response", 502);
  }

  return parsed;
}

function isValidScore(value: unknown): value is number {
  return typeof value === "number" && value >= 0 && value <= 100;
}

function buildUserPrompt({ title, description }: ValidateIdeaInput): string {
  return [`Idea title: ${title}`, `Idea description: ${description}`].join(
    "\n\n",
  );
}
