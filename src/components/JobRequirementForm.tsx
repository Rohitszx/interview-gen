import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobRequirement, JobRole, ExperienceLevel } from "../types";
import { JOB_ROLES, EXPERIENCE_LEVELS } from "@/constants/jobRoles";
import debounce from "lodash.debounce";
import { Spinner } from "@/components/ui/spinner"; 
import {SkillBadge} from "./SkillBadge";

interface JobRequirementFormProps {
  onSubmit: (jobRequirement: JobRequirement) => void;
  loading: boolean;
}

export const JobRequirementForm = ({
  onSubmit,
  loading,
}: JobRequirementFormProps) => {
  const [role, setRole] = useState<JobRole>("Frontend Developer");
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Mid-Level");
  const [currentSkill, setCurrentSkill] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (!currentSkill.trim()) {
      setError("Skill cannot be empty.");
      return;
    }
    if (skills.includes(currentSkill.trim())) {
      setError("Skill already added.");
      return;
    }
    setSkills([...skills, currentSkill.trim()]);
    setCurrentSkill("");
    setError(null);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }
    onSubmit({
      role,
      skills,
      experienceLevel,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const debouncedSetCurrentSkill = debounce((value: string) => {
    setCurrentSkill(value);
  }, 300);

  return (
    <form onSubmit={handleSubmit} aria-label="Job Requirement Form">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Job Requirements</CardTitle>
          <CardDescription>
            Enter the job details to generate tailored interview questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Job Role Selection */}
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium">
              Job Role
            </label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as JobRole)}
            >
              <SelectTrigger id="role" aria-label="Job Role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {JOB_ROLES.map((jobRole) => (
                  <SelectItem key={jobRole} value={jobRole}>
                    {jobRole}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills Input */}
          <div className="space-y-2">
            <label htmlFor="skills" className="block text-sm font-medium">
              Required Skills
            </label>
            <div className="flex">
              <Input
                id="skills"
                onChange={(e) => debouncedSetCurrentSkill(e.target.value)}
                placeholder="Enter a skill (e.g. React, Node.js, SQL)"
                className="flex-1 mr-2"
                onKeyDown={handleKeyDown}
                aria-label="Skill Input"
              />
              <Button type="button" onClick={handleAddSkill} aria-label="Add Skill">
                Add
              </Button>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  onRemove={() => handleRemoveSkill(skill)}
                />
              ))}
            </div>
            {skills.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Add at least one skill to generate questions.
              </p>
            )}
          </div>

          {/* Experience Level Selection */}
          <div className="space-y-2">
            <label htmlFor="experienceLevel" className="block text-sm font-medium">
              Experience Level
            </label>
            <Select
              value={experienceLevel}
              onValueChange={(value) => setExperienceLevel(value as ExperienceLevel)}
            >
              <SelectTrigger id="experienceLevel" aria-label="Experience Level">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            disabled={loading || skills.length === 0}
            aria-label="Generate Questions"
          >
            {loading ? (
              <>
              <Spinner/>
              Generating Questions, please wait...
              </>
            ) : (
              "Generate Questions"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};



