import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Leaf, Car, Home, ShoppingBag, Utensils } from "lucide-react";

const CarbonCalculator = () => {
  const [carMiles, setCarMiles] = useState(50);
  const [diet, setDiet] = useState("mixed");
  const [electricity, setElectricity] = useState(30);
  const [shopping, setShopping] = useState(5);

  // Carbon calculations (kg CO₂ per week)
  const transportCarbon = (carMiles * 0.404); // 0.404 kg CO₂ per mile
  const dietCarbon = {
    vegan: 5.5,
    vegetarian: 7.2,
    mixed: 11.9,
    meatHeavy: 15.8
  }[diet] || 11.9;
  const electricityCarbon = (electricity * 0.233); // 0.233 kg CO₂ per kWh
  const shoppingCarbon = shopping * 3; // rough estimate

  const totalCarbon = transportCarbon + dietCarbon + electricityCarbon + shoppingCarbon;
  const yearlyCarbon = (totalCarbon * 52 / 1000).toFixed(2); // Convert to tons per year
  
  // Average person emits ~4 tons per year in the US
  const avgCarbon = 4;
  const percentageVsAvg = ((parseFloat(yearlyCarbon) / avgCarbon) * 100).toFixed(0);

  return (
    <Card className="border-0 shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Leaf className="w-5 h-5 text-success" />
          Carbon Footprint Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimate your weekly environmental impact
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transportation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Car className="w-4 h-4" />
              Car Travel (miles/week)
            </Label>
            <span className="text-sm font-semibold text-primary">{carMiles} mi</span>
          </div>
          <Slider
            value={[carMiles]}
            onValueChange={(v) => setCarMiles(v[0])}
            min={0}
            max={500}
            step={10}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            ≈ {transportCarbon.toFixed(1)} kg CO₂/week
          </p>
        </div>

        {/* Diet */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground">
            <Utensils className="w-4 h-4" />
            Diet Type
          </Label>
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegan">🌱 Vegan</SelectItem>
              <SelectItem value="vegetarian">🥗 Vegetarian</SelectItem>
              <SelectItem value="mixed">🍽️ Mixed (Typical)</SelectItem>
              <SelectItem value="meatHeavy">🥩 Meat Heavy</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            ≈ {dietCarbon.toFixed(1)} kg CO₂/week
          </p>
        </div>

        {/* Electricity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Home className="w-4 h-4" />
              Electricity (kWh/day)
            </Label>
            <span className="text-sm font-semibold text-primary">{electricity} kWh</span>
          </div>
          <Slider
            value={[electricity]}
            onValueChange={(v) => setElectricity(v[0])}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            ≈ {(electricityCarbon).toFixed(1)} kg CO₂/week
          </p>
        </div>

        {/* Shopping */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <ShoppingBag className="w-4 h-4" />
              Shopping Trips/week
            </Label>
            <span className="text-sm font-semibold text-primary">{shopping}</span>
          </div>
          <Slider
            value={[shopping]}
            onValueChange={(v) => setShopping(v[0])}
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            ≈ {shoppingCarbon.toFixed(1)} kg CO₂/week
          </p>
        </div>

        {/* Results */}
        <div className="bg-primary/10 rounded-lg p-4 space-y-3 border border-primary/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Your Annual Carbon Footprint</p>
            <p className="text-4xl font-bold text-primary mb-2">{yearlyCarbon} tons</p>
            <p className="text-sm text-muted-foreground">CO₂ per year</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">vs. Average Person</span>
              <span className={`font-semibold ${parseFloat(percentageVsAvg) > 100 ? 'text-warning' : 'text-success'}`}>
                {percentageVsAvg}%
              </span>
            </div>
            <Progress 
              value={Math.min(parseFloat(percentageVsAvg), 200)} 
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Weekly</p>
              <p className="text-lg font-bold text-foreground">{totalCarbon.toFixed(1)} kg</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Daily</p>
              <p className="text-lg font-bold text-foreground">{(totalCarbon / 7).toFixed(1)} kg</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-secondary/50 rounded-lg p-3 text-sm">
          <p className="font-semibold text-foreground mb-2">💡 Quick Tips to Reduce:</p>
          <ul className="space-y-1 text-muted-foreground text-xs">
            {carMiles > 100 && <li>• Try carpooling or public transit to reduce driving</li>}
            {diet === "meatHeavy" && <li>• Consider reducing meat consumption by 1-2 meals/week</li>}
            {electricity > 50 && <li>• Unplug unused devices and switch to LED bulbs</li>}
            {shopping > 10 && <li>• Combine shopping trips to reduce transportation emissions</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;