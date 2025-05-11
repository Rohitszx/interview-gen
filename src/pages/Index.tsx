import { useState, useEffect } from "react";
import { JobRequirementForm } from "@/components/JobRequirementForm";
import { QuestionsList } from "@/components/QuestionsList";
import { Header } from "@/components/Header";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { JobRequirement, QuestionsResponse } from "../types";
import { generateQuestions } from "../services/api";
import { toast } from "sonner";

// Custom hook for generating questions
const useGenerateQuestions = (apiKey: string | null) => {
  const [loading, setLoading] = useState(false);
  const [questionsResponse, setQuestionsResponse] = useState<QuestionsResponse | null>(null);

  const generate = async (requirements: JobRequirement) => {
    setLoading(true);
    try {
      if (!apiKey) {
        throw new Error("API key is missing. Please provide a valid API key.");
      }

      const response = await generateQuestions(requirements, apiKey);
      setQuestionsResponse(response);
      toast.success("Questions generated successfully!");
    } catch (error: any) {
      console.error("Failed to generate questions:", error);
      toast.error(error.message || "Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, questionsResponse, generate };
};

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [jobRequirement, setJobRequirement] = useState<JobRequirement | null>(null);

  useEffect(() => {
    // Load API key from local storage
    const savedApiKey = localStorage.getItem("groq-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const { loading, questionsResponse, generate } = useGenerateQuestions(apiKey);

  const handleGenerateQuestions = (requirements: JobRequirement) => {
    setJobRequirement(requirements);
    generate(requirements);
  };

  const handleRegenerateQuestions = () => {
    if (jobRequirement) {
      generate(jobRequirement);
    }
  };

  const handleApiKeySaved = (key: string) => {
    setApiKey(key);
    localStorage.setItem("groq-api-key", key);
    toast.success("API key saved successfully!");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col">
      {!apiKey && <ApiKeyInput onApiKeySaved={handleApiKeySaved} />}

      <Header />

      <main className="flex-1">
        <div className="container mx-auto py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <JobRequirementForm onSubmit={handleGenerateQuestions} loading={loading} />
            </div>
            <div>
              <QuestionsList
                questions={questionsResponse?.questions || []}
                onRegenerateQuestions={handleRegenerateQuestions}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer currentYear={currentYear} />
    </div>
  );
};

const Footer = ({ currentYear }: { currentYear: number }) => (
  <footer className="border-t py-6 md:py-0">
    <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} Technical Interview Question Generator
      </p>
      <p className="text-sm text-muted-foreground">
        Developed by{" "}
        <a
          href="https://linkedin.com/in/rohitszx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Rohit Kumar
        </a>
      </p>
    </div>
  </footer>
);

export default Index;
