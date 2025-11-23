import { useEffect } from "react";
import { Leaf } from "lucide-react";
import WeatherDashboard from "@/components/WeatherDashboard";
import HistoricalComparison from "@/components/HistoricalComparison";
import DailyChallenge from "@/components/DailyChallenge";
import CarbonTips from "@/components/CarbonTips";
import CarbonCalculator from "@/components/CarbonCalculator";
import ExtremeWeatherAlerts from "@/components/ExtremeWeatherAlerts";
import SettingsDialog from "@/components/SettingsDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getApiKey, setApiKey, setStoredLocation } from "@/lib/weatherApi";

const Index = () => {
  useEffect(() => {
    // Initialize API key and location if not set
    if (!getApiKey()) {
      setApiKey("8a8bc742a11623509eda0a0a1fac9f06");
      setStoredLocation("Chittagong");
    }
  }, []);

  const hasApiKey = getApiKey();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Climate Compass</h1>
                <p className="text-white/80 text-sm">Your personal climate awareness companion</p>
              </div>
            </div>
            <SettingsDialog />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {!hasApiKey && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Welcome to Climate Compass! Please configure your OpenWeatherMap API key in settings to get started.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Weather Dashboard */}
        <WeatherDashboard />

        {/* Daily Challenge - Prominent position */}
        <DailyChallenge />

        {/* Two-column layout for medium screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HistoricalComparison />
          <div className="space-y-6">
            <CarbonCalculator />
            <CarbonTips />
            <ExtremeWeatherAlerts />
          </div>
        </div>

        {/* Climate Impact Summary */}
        <div className="bg-gradient-card border-0 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">📈 This Week's Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">1.8 kg</p>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-success mb-1">5/7</p>
              <p className="text-sm text-muted-foreground">Challenges Completed</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-accent mb-1">+1.1°C</p>
              <p className="text-sm text-muted-foreground">Warmer than average</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Keep up the great work! Every small action counts toward a healthier planet. 🌍
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Climate Compass • Empowering climate action, one day at a time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
