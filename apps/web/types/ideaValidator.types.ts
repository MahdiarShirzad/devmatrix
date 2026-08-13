export type IdeaStatus = "pending" | "completed" | "failed";

export interface Idea {
  _id: string;
  userId: string;
  projectId?: string;
  title: string;
  description: string;
  status: IdeaStatus;
  category?: string;
  overallScore?: number;
  overallSummary?: string;
  marketFitScore?: number;
  marketFitSummary?: string;
  competitionScore?: number;
  competitionSummary?: string;
  riskScore?: number;
  riskSummary?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OverviewStats {
  totalIdeas: number;
  validatedCount: number;
  avgScore: number;
}

export interface CreateIdeaInput {
  title: string;
  description: string;
  projectId?: string;
}

export interface ReevaluateIdeaInput {
  description: string;
}
