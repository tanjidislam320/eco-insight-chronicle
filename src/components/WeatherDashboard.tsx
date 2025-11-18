import { Cloud, CloudRain, Wind, Droplets, Sun, Sunset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WeatherDashboard = () => {
  // Mock data - will be replaced with real API data later
  const currentWeather = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    rainChance: 40,
    sunrise: "06:24 AM",
    sunset: "06:48 PM",
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="w-12 h-12 text-primary" />
              <div>
                <h2 className="text-5xl font-bold text-foreground">{currentWeather.temp}°C</h2>
                <p className="text-muted-foreground text-lg">{currentWeather.condition}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
              <CloudRain className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Rain</p>
                <p className="text-sm font-semibold">{currentWeather.rainChance}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
              <Wind className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="text-sm font-semibold">{currentWeather.wind} km/h</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
              <Droplets className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-sm font-semibold">{currentWeather.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
              <Sun className="w-5 h-5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Sunrise</p>
                <p className="text-sm font-semibold">{currentWeather.sunrise}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3 col-span-2 md:col-span-1">
              <Sunset className="w-5 h-5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Sunset</p>
                <p className="text-sm font-semibold">{currentWeather.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDashboard;
