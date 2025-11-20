import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiKey, setApiKey, getStoredLocation, setStoredLocation } from "@/lib/weatherApi";
import { useToast } from "@/hooks/use-toast";

const SettingsDialog = () => {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setApiKeyInput(getApiKey() || "");
      setLocationInput(getStoredLocation());
    }
  }, [open]);

  const handleSave = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setStoredLocation(locationInput.trim() || "New York");
      
      toast({
        title: "Settings saved",
        description: "Your API key and location have been updated. Refreshing weather data...",
      });
      
      // Reload page to fetch new data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Weather Settings</DialogTitle>
          <DialogDescription>
            Configure your OpenWeatherMap API key and default location
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenWeatherMap API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Don't have an API key?{" "}
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get one for free
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Default Location</Label>
            <Input
              id="location"
              placeholder="e.g., New York, London, Tokyo"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter a city name. You can change this anytime.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
