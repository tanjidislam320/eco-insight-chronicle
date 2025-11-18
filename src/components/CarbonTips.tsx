import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { useState } from "react";

const CarbonTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      tip: "Use a fan instead of AC for 1 hour today",
      impact: "Saves 0.2 kg CO₂",
      icon: "🌬️",
    },
    {
      tip: "Walk or bike for trips under 2 km",
      impact: "Saves 0.5 kg CO₂ per trip",
      icon: "🚴",
    },
    {
      tip: "Avoid single-use plastics today",
      impact: "Prevents 0.3 kg CO₂ emissions",
      icon: "♻️",
    },
    {
      tip: "Turn off standby power at night",
      impact: "Saves 0.15 kg CO₂ daily",
      icon: "🔌",
    },
    {
      tip: "Use natural light for 1 hour instead of electric",
      impact: "Saves 0.1 kg CO₂",
      icon: "☀️",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <Card className="border-0 shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          Daily Carbon Tips
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Small actions, big impact
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative bg-secondary/50 rounded-lg p-6 min-h-[180px] flex flex-col justify-between">
          <div className="text-center space-y-4">
            <div className="text-5xl">{tips[currentTip].icon}</div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-2">
                {tips[currentTip].tip}
              </p>
              <p className="text-sm text-primary font-medium">
                💚 {tips[currentTip].impact}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTip}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-1.5">
              {tips.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentTip
                      ? "w-8 bg-primary"
                      : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTip}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonTips;
