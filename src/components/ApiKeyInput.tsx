import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Key, Copy } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySaved: (apiKey: string) => void;
}

const TEST_API_KEY = "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";

export const ApiKeyInput = ({ onApiKeySaved }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showDialog, setShowDialog] = useState(true);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    localStorage.setItem("groq-api-key", apiKey);
    onApiKeySaved(apiKey);
    setShowDialog(false);
    toast.success("API key saved successfully");
  };

  const useTestKey = () => {
    setApiKey(TEST_API_KEY);
    localStorage.setItem("groq-api-key", TEST_API_KEY);
    onApiKeySaved(TEST_API_KEY);
    setShowDialog(false);
    toast.success("Using test GroqCloud API key");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleCopyTestKey = () => {
    navigator.clipboard.writeText(TEST_API_KEY)
      .then(() => toast.success("Test API key copied!"))
      .catch(() => toast.error("Failed to copy the key"));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" /> Enter your Groq API Key
          </DialogTitle>
          <DialogDescription>
            Your API key is required to generate questions. It will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <Label htmlFor="api-key" className="sr-only">
            Groq API Key
          </Label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="gsk-..."
            className="w-full"
            onKeyDown={handleKeyDown}
          />
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an API key? Get one from{" "}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Groq Console
            </a>
          </p>
        </div>
        <DialogFooter>
        <Button 
            type="button" 
            variant="outline" 
            onClick={useTestKey} 
            className="w-full sm:w-auto"
          >
            Use Test Key
          </Button>
          <Button type="button" onClick={handleSave}>
            Save My API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
