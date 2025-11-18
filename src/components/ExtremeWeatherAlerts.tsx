import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ThermometerSun, CloudRain, Wind, Phone } from "lucide-react";

const ExtremeWeatherAlerts = () => {
  const alerts = [
    {
      type: "Heatwave",
      severity: "high",
      message: "High temperatures expected (38-42°C) for next 3 days",
      icon: <ThermometerSun className="w-5 h-5" />,
      color: "warning",
    },
    {
      type: "Heavy Rainfall",
      severity: "medium",
      message: "Moderate to heavy rain expected this weekend",
      icon: <CloudRain className="w-5 h-5" />,
      color: "accent",
    },
    {
      type: "Air Quality",
      severity: "low",
      message: "Good air quality today (AQI: 45)",
      icon: <Wind className="w-5 h-5" />,
      color: "success",
    },
  ];

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="border-0 shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Extreme Weather Alerts
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Stay informed about weather conditions
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3 transition-all hover:bg-secondary/70"
          >
            <div className={`p-2 rounded-full bg-${alert.color}/10`}>
              {alert.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">{alert.type}</h4>
                <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-primary">Emergency Contacts</h4>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">Police: <span className="font-semibold">100</span></p>
            <p className="text-foreground">Ambulance: <span className="font-semibold">102</span></p>
            <p className="text-foreground">Fire: <span className="font-semibold">101</span></p>
            <p className="text-foreground">Disaster Helpline: <span className="font-semibold">1078</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtremeWeatherAlerts;
