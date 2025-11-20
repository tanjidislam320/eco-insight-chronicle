import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getWeatherHistory, getStoredLocation } from "@/lib/weatherApi";
import { useMemo } from "react";

const HistoricalComparison = () => {
  const location = getStoredLocation();
  const history = getWeatherHistory(location);

  const { chartData, stats } = useMemo(() => {
    if (history.length < 2) {
      return { chartData: [], stats: { tempDiff: 0, rainfallDiff: 0 } };
    }

    // Get data from last 30 days for monthly view
    const last30Days = history.slice(-30);
    const chartData = last30Days.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp: item.temp,
      rainfall: item.rainfall,
    }));

    // Calculate differences (compare most recent with oldest available)
    const recent = history[history.length - 1];
    const old = history[0];
    const tempDiff = parseFloat((recent.temp - old.temp).toFixed(1));
    const rainfallDiff = parseFloat((recent.rainfall - old.rainfall).toFixed(1));

    return { chartData, stats: { tempDiff, rainfallDiff } };
  }, [history]);

  const daysOfData = history.length;

  return (
    <Card className="border-0 shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          📊 Historical Climate Trends
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Local weather data collected over time • {daysOfData} day{daysOfData !== 1 ? 's' : ''} of data
        </p>
      </CardHeader>
      <CardContent>
        {daysOfData < 2 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Historical comparison will appear here as you use the app over time. 
              Weather data is automatically collected daily to track climate trends.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature Trend</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.tempDiff > 0 ? '+' : ''}{stats.tempDiff}°C
                    </p>
                  </div>
                  {stats.tempDiff > 0 ? (
                    <TrendingUp className="w-8 h-8 text-warning" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-accent" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Change since first recorded data
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cloud Cover Trend</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.rainfallDiff > 0 ? '+' : ''}{stats.rainfallDiff}%
                    </p>
                  </div>
                  {stats.rainfallDiff > 0 ? (
                    <TrendingUp className="w-8 h-8 text-accent" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-accent" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Change in cloud coverage over time
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Cloud Cover (%)"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Data is collected automatically each day. For full historical comparison 
                (1+ years), consider upgrading to OpenWeatherMap's paid plan for access to their Historical API.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalComparison;
