import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export const SkillBadge = ({
  skill,
  onRemove,
}: {
  skill: string;
  onRemove: () => void;
}) => (
  <Badge
    variant="secondary"
    className="flex items-center gap-1 text-sm"
    aria-label={`Skill: ${skill}`}
  >
    {skill}
    <X
      size={14}
      className="cursor-pointer"
      onClick={onRemove}
      aria-label={`Remove ${skill}`}
    />
  </Badge>
);