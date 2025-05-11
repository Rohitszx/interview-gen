
import { Question } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionsListProps {
  questions: Question[];
  onRegenerateQuestions: () => void;
}

export const QuestionsList = ({
  questions,
  onRegenerateQuestions,
}: QuestionsListProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Junior":
        return "bg-green-100 text-green-800";
      case "Mid-Level":
        return "bg-blue-100 text-blue-800";
      case "Senior":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Questions</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRegenerateQuestions}
        >
          Regenerate Questions
        </Button>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No questions generated yet. Fill out the form to get started.
          </p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {questions.map((question) => (
              <AccordionItem key={question.id} value={question.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                    <span className="font-medium">{question.question}</span>
                    <div className="flex flex-col gap-1">
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.category}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Evaluation Criteria:</h4>
                    <ul className="space-y-2">
                      {question.evaluationCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
