
export type JobRole = 
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "Data Scientist"
  | "DevOps Engineer"
  | "Mobile Developer"
  | "QA Engineer"
  | "UI/UX Developer";

export type ExperienceLevel = "Junior" | "Mid-Level" | "Senior";

export interface JobRequirement {
  role: JobRole;
  skills: string[];
  experienceLevel: ExperienceLevel;
}

export interface Question {
  id: string;
  question: string;
  difficulty: ExperienceLevel;
  evaluationCriteria: string[];
  category: string;
}

export interface QuestionsResponse {
  questions: Question[];
  timestamp: string;
}
