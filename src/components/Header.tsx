import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { BrainCircuit } from "lucide-react";
import { useTheme } from "next-themes";

export const Header = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-medium">
            {isMobile ? "TechInterview AI" : "Technical Interview Question Generator"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://github.com/rohitszx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>
    </header>
  );
};
