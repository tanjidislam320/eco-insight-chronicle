import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const HistoricalComparison = () => {
  // Mock historical data
  const data1Year = [
    { month: "Jan", thisYear: 26, lastYear: 24 },
    { month: "Feb", thisYear: 27, lastYear: 25 },
    { month: "Mar", thisYear: 29, lastYear: 27 },
    { month: "Apr", thisYear: 31, lastYear: 29 },
    { month: "May", thisYear: 32, lastYear: 30 },
    { month: "Jun", thisYear: 30, lastYear: 28 },
  ];

  const data5Years = [
    { year: "2019", temp: 25.2 },
    { year: "2020", temp: 25.8 },
    { year: "2021", temp: 26.3 },
    { year: "2022", temp: 26.9 },
    { year: "2023", temp: 27.4 },
    { year: "2024", temp: 28.1 },
  ];

  const tempDiff = 2.3;
  const rainfallDiff = -15;

  return (
    <Card className="border-0 shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          📊 Historical Climate Comparison
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track climate changes over time
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1year" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="1year">1 Year</TabsTrigger>
            <TabsTrigger value="5years">5 Years</TabsTrigger>
            <TabsTrigger value="10years">10 Years</TabsTrigger>
          </TabsList>

          <TabsContent value="1year" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature Change</p>
                    <p className="text-2xl font-bold text-foreground">+{tempDiff}°C</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-warning" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Today is {tempDiff}°C hotter than last year
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rainfall Change</p>
                    <p className="text-2xl font-bold text-foreground">{rainfallDiff}%</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.abs(rainfallDiff)}% less rainfall this year
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data1Year}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="thisYear" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="This Year"
                />
                <Line 
                  type="monotone" 
                  dataKey="lastYear" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Last Year"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="5years" className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">5-Year Temperature Trend</p>
              <p className="text-lg font-semibold text-foreground">
                Average temperature has increased by 2.9°C over the past 5 years
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data5Years}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={3}
                  name="Avg Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="10years">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                10-year historical data will be available soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HistoricalComparison;
