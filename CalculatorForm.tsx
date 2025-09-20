import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Calculator, DollarSign, MapPin } from "lucide-react";

interface CalculatorFormProps {
  onCalculate: (data: {
    pricePerMT: number;
    distance: number;
    market: "poland" | "western-europe";
  }) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [pricePerMT, setPricePerMT] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [market, setMarket] = useState<"poland" | "western-europe">("poland");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pricePerMT && distance) {
      onCalculate({
        pricePerMT: parseFloat(pricePerMT),
        distance: parseFloat(distance),
        market,
      });
    }
  };

  const calculateDeliveryRate = (dist: number) => {
    if (dist === 0) return 0;
    // For distances <100km, use 100km price. For >=100km, use direct variation
    const effectiveDistance = Math.max(100, dist);
    return (effectiveDistance / 500) * 4000; // 4000 PLN for 500km baseline
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Price Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="price" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Rice Price (USD per Metric Ton)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter price in USD"
              value={pricePerMT}
              onChange={(e) => setPricePerMT(e.target.value)}
              required
              data-testid="input-price"
            />
          </div>

          <Tabs value={market} onValueChange={(value) => setMarket(value as "poland" | "western-europe")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="poland" data-testid="tab-poland">Poland</TabsTrigger>
              <TabsTrigger value="western-europe" data-testid="tab-western-europe">Western Europe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="poland" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="distance" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Distance (km)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  step="1"
                  placeholder="Enter distance in kilometers"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                  data-testid="input-distance"
                />
                {distance && (
                  <p className="text-sm text-muted-foreground">
                    Delivery rate: {calculateDeliveryRate(parseFloat(distance))} PLN per container
                  </p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="western-europe" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="distance-eu" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Distance (km)
                </Label>
                <Input
                  id="distance-eu"
                  type="number"
                  step="1"
                  placeholder="Enter distance in kilometers"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                  data-testid="input-distance-eu"
                />
                <p className="text-sm text-muted-foreground">
                  Includes additional 2 PLN per kg markup for Western Europe
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button type="submit" className="w-full" data-testid="button-calculate">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Prices
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}