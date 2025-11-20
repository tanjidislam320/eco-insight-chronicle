import { Cloud, CloudRain, Wind, Droplets, Sun, Sunset, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentWeather } from "@/hooks/useWeatherData";
import { getStoredLocation } from "@/lib/weatherApi";

const WeatherDashboard = () => {
  const { data: currentWeather, isLoading, error } = useCurrentWeather();
  const location = getStoredLocation();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : "Failed to fetch weather data"}
          {" "}Please check your settings.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !currentWeather) {
    return (
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <Skeleton className="h-16 w-48 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-24" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md bg-gradient-card">
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">📍 {location}</p>
        </div>
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
                <p className="text-xs text-muted-foreground">Clouds</p>
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
