import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, Flame } from "lucide-react";
import { toast } from "sonner";

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(450);

  const challenge = {
    title: "Save 1 liter of water today",
    description: "Turn off the tap while brushing your teeth",
    xpReward: 50,
    co2Saved: "0.3 kg CO₂",
  };

  const handleComplete = () => {
    setCompleted(true);
    setXp(xp + challenge.xpReward);
    setStreak(streak + 1);
    toast.success(`Challenge completed! +${challenge.xpReward} XP`, {
      description: `You saved ${challenge.co2Saved} today!`,
    });
  };

  const handleSkip = () => {
    toast.info("Challenge skipped. Try again tomorrow!");
  };

  return (
    <Card className="border-0 shadow-md bg-gradient-primary">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            🎯 Today's Eco Challenge
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <Flame className="w-4 h-4 text-warning" />
              <span className="text-sm font-semibold">{streak} day streak</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <Trophy className="w-4 h-4 text-warning" />
              <span className="text-sm font-semibold">{xp} XP</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!completed ? (
          <>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
              <p className="text-white/80 text-sm mb-3">{challenge.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/90">
                <span className="flex items-center gap-1">
                  🏆 {challenge.xpReward} XP
                </span>
                <span className="flex items-center gap-1">
                  🌱 Saves {challenge.co2Saved}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleComplete}
                className="flex-1 bg-white text-primary hover:bg-white/90"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete
              </Button>
              <Button 
                onClick={handleSkip}
                variant="outline"
                className="flex-1 border-white/30 text-white hover:bg-white/10"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Skip
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Challenge Complete! 🎉</h3>
            <p className="text-white/80 mb-4">
              Great job! You've earned {challenge.xpReward} XP and saved {challenge.co2Saved}
            </p>
            <Progress value={75} className="mb-2" />
            <p className="text-xs text-white/70">Level 7 Progress: 450/600 XP</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
