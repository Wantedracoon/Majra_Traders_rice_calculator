import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { TrendingUp, Truck, Ship, AlertCircle } from "lucide-react";

interface PriceData {
  pricePerMT: number;
  distance: number;
  market: "poland" | "western-europe";
}

interface CurrencyRates {
  USD: number;
  EUR: number;
  PLN: number;
}

interface ResultsDisplayProps {
  data: PriceData | null;
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [rates, setRates] = useState<CurrencyRates>({ USD: 1, EUR: 0.92, PLN: 4.25 });
  const [loading, setLoading] = useState(false);

  // Mock currency rate fetching
  useEffect(() => {
    if (data) {
      setLoading(true);
      // Simulate API call for exchange rates
      setTimeout(() => {
        setRates({
          USD: 1,
          EUR: 0.92 + Math.random() * 0.02 - 0.01, // Mock fluctuation
          PLN: 4.25 + Math.random() * 0.1 - 0.05,
        });
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter rice price and distance to see calculated prices</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const calculatePrices = () => {
    const { pricePerMT, distance, market } = data;
    const baseMultiplier = 2.5;
    
    // Calculate delivery rate for Poland
    // For distances <100km, use 100km price. For >=100km, use direct variation
    const effectiveDistance = distance === 0 ? 0 : Math.max(100, distance);
    const deliveryRate = (effectiveDistance / 500) * 4000; // 4000 PLN for 500km

    // Base CIF prices (in USD)
    const cifPer1KG = (pricePerMT / 1000) * baseMultiplier;
    const cifPer1MT = pricePerMT * baseMultiplier;
    const cifPer25MT = cifPer1MT * 25;

    // DDP prices (in USD base, then converted)
    let ddpPer1KG, ddpPer1MT, ddpPer25MT;

    if (market === "poland") {
      ddpPer1KG = cifPer1KG + (deliveryRate / 25000);
      ddpPer1MT = cifPer1MT + (deliveryRate / 25);
      ddpPer25MT = cifPer25MT + deliveryRate;
    } else {
      // Western Europe - add 2 PLN per kg
      const extraPLNPerKg = 2;
      ddpPer1KG = cifPer1KG + extraPLNPerKg / rates.PLN + (deliveryRate / 25000);
      ddpPer1MT = ddpPer1KG * 1000;
      ddpPer25MT = ddpPer1MT * 25;
    }

    return {
      cif: {
        per1KG: cifPer1KG,
        per1MT: cifPer1MT,
        per25MT: cifPer25MT,
      },
      ddp: {
        per1KG: ddpPer1KG,
        per1MT: ddpPer1MT,
        per25MT: ddpPer25MT,
      },
      deliveryRate,
    };
  };

  const formatCurrency = (amount: number, currency: "USD" | "EUR" | "PLN") => {
    const convertedAmount = amount * rates[currency];
    const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "zł";
    return `${symbol}${convertedAmount.toFixed(2)}`;
  };

  const prices = calculatePrices();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Price Results
          <Badge variant="secondary" className="ml-auto">
            {data.market === "poland" ? "Poland" : "Western Europe"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Fetching latest exchange rates...
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {/* CIF Prices */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold">CIF Prices</h3>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">1 KG</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-cif-1kg-usd">
                    {formatCurrency(prices.cif.per1KG, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.cif.per1KG, "EUR")} • {formatCurrency(prices.cif.per1KG, "PLN")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">1 MT</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-cif-1mt-usd">
                    {formatCurrency(prices.cif.per1MT, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.cif.per1MT, "EUR")} • {formatCurrency(prices.cif.per1MT, "PLN")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">25 MT (Container)</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-cif-25mt-usd">
                    {formatCurrency(prices.cif.per25MT, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.cif.per25MT, "EUR")} • {formatCurrency(prices.cif.per25MT, "PLN")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DDP Prices */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold">DDP Prices</h3>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">1 KG</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-ddp-1kg-usd">
                    {formatCurrency(prices.ddp.per1KG, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.ddp.per1KG, "EUR")} • {formatCurrency(prices.ddp.per1KG, "PLN")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">1 MT</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-ddp-1mt-usd">
                    {formatCurrency(prices.ddp.per1MT, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.ddp.per1MT, "EUR")} • {formatCurrency(prices.ddp.per1MT, "PLN")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">25 MT (Container)</span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono" data-testid="price-ddp-25mt-usd">
                    {formatCurrency(prices.ddp.per25MT, "USD")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(prices.ddp.per25MT, "EUR")} • {formatCurrency(prices.ddp.per25MT, "PLN")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Rates */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Exchange Rates</h4>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>1 USD = {rates.EUR.toFixed(4)} EUR</span>
              <span>1 USD = {rates.PLN.toFixed(2)} PLN</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}