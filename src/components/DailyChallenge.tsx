import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, Flame } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Challenge {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  co2Saved: string;
  completed: boolean;
}

const DailyChallenge = () => {
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(450);
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Save 1 liter of water today",
      description: "Turn off the tap while brushing your teeth",
      xpReward: 50,
      co2Saved: "0.3 kg CO₂",
      completed: true,
    },
    {
      id: 2,
      title: "Use reusable bags",
      description: "Bring your own bag when shopping today",
      xpReward: 40,
      co2Saved: "0.5 kg CO₂",
      completed: true,
    },
    {
      id: 3,
      title: "Skip meat for one meal",
      description: "Choose a plant-based meal today",
      xpReward: 60,
      co2Saved: "2.5 kg CO₂",
      completed: true,
    },
    {
      id: 4,
      title: "Bike or walk instead of drive",
      description: "Use active transportation for a short trip",
      xpReward: 80,
      co2Saved: "3.2 kg CO₂",
      completed: true,
    },
    {
      id: 5,
      title: "Unplug unused electronics",
      description: "Disconnect devices on standby mode",
      xpReward: 45,
      co2Saved: "0.8 kg CO₂",
      completed: true,
    },
    {
      id: 6,
      title: "Use natural light",
      description: "Keep lights off during daylight hours",
      xpReward: 35,
      co2Saved: "0.4 kg CO₂",
      completed: false,
    },
    {
      id: 7,
      title: "Start composting",
      description: "Separate organic waste for composting",
      xpReward: 70,
      co2Saved: "1.2 kg CO₂",
      completed: false,
    },
  ]);

  const completedCount = challenges.filter(c => c.completed).length;
  const todayChallenge = challenges.find(c => !c.completed) || challenges[0];

  const handleComplete = (challengeId: number) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, completed: true } : c
    ));
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setXp(xp + challenge.xpReward);
      if (challengeId === todayChallenge.id) {
        setStreak(streak + 1);
      }
      toast.success(`Challenge completed! +${challenge.xpReward} XP`, {
        description: `You saved ${challenge.co2Saved} today!`,
      });
    }
  };

  return (
    <Card className="border-0 shadow-md bg-gradient-primary">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2">
          <span className="flex items-center gap-2">
            🎯 Eco Challenges
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
        <div className="mt-2">
          <Progress value={(completedCount / challenges.length) * 100} className="h-2" />
          <p className="text-white/70 text-sm mt-1">{completedCount}/{challenges.length} Challenges Completed</p>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="today" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Today's Challenge
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              All Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{todayChallenge.title}</h3>
              <p className="text-white/80 text-sm mb-3">{todayChallenge.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/90 mb-4">
                <span className="flex items-center gap-1">
                  🏆 {todayChallenge.xpReward} XP
                </span>
                <span className="flex items-center gap-1">
                  🌱 Saves {todayChallenge.co2Saved}
                </span>
              </div>
              {!todayChallenge.completed && (
                <Button 
                  onClick={() => handleComplete(todayChallenge.id)}
                  className="w-full bg-white text-primary hover:bg-white/90"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Challenge
                </Button>
              )}
              {todayChallenge.completed && (
                <div className="text-center py-2">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                  <p className="text-white font-semibold">Challenge Complete! 🎉</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 ${
                  challenge.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                      {challenge.completed && <CheckCircle2 className="w-4 h-4 text-success" />}
                      {challenge.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-xs text-white/80">
                      <span>🏆 {challenge.xpReward} XP</span>
                      <span>🌱 {challenge.co2Saved}</span>
                    </div>
                  </div>
                  {!challenge.completed && (
                    <Button
                      size="sm"
                      onClick={() => handleComplete(challenge.id)}
                      className="bg-white text-primary hover:bg-white/90 shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
