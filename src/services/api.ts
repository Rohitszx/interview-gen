import { JobRequirement, QuestionsResponse } from "../types";
import { toast } from "sonner";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateQuestions(
  jobRequirement: JobRequirement,
  apiKey: string | null
): Promise<QuestionsResponse> {
  if (!apiKey) {
    const errorMessage = "API key is missing. Please provide a valid API key.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const prompt = createPrompt(jobRequirement);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", 
        messages: [
          {
            role: "system",
            content:
              "You are a technical interviewer assistant that creates questions for technical interviews. Format your response as JSON without any explanation. Follow the structure exactly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.error?.message || "An unknown error occurred while generating questions.";
      console.error("API Error:", errorMessage);
      toast.error(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const data: { choices: { message: { content: string } }[] } = await response.json();
    const parsedData = JSON.parse(data.choices[0].message.content);

    if (!parsedData.questions) {
      throw new Error("Invalid response format from Groq API.");
    }

    return {
      questions: parsedData.questions,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating questions:", { error, jobRequirement });
    toast.error("Failed to generate questions. Please try again.");
    throw error;
  }
}

function createPrompt(jobRequirement: JobRequirement): string {
  const { role, skills, experienceLevel } = jobRequirement;

  const sanitizeInput = (input: string) => input.replace(/[\r\n\t]/g, "").trim();
  const sanitizedRole = sanitizeInput(role);
  const sanitizedSkills = skills.map(sanitizeInput).join(", ");

  return `
    Create a set of 5 technical interview questions for a ${experienceLevel} ${sanitizedRole} with skills in ${sanitizedSkills}.

    For each question:
    1. The question should test the knowledge appropriate for the ${experienceLevel} level
    2. Include 3-5 specific evaluation criteria for each question
    3. Categorize the question based on the skill it primarily tests

    Format the response as a JSON object:
    {
      "questions": [
        {
          "id": "1",
          "question": "Your question here",
          "difficulty": "${experienceLevel}",
          "evaluationCriteria": ["Criterion 1", "Criterion 2", "Criterion 3"],
          "category": "Specific skill being tested"
        }
      ]
    }
  `;
}
