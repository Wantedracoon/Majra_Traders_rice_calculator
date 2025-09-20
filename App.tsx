import { useState } from "react";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./toaster";
import { TooltipProvider } from "./tooltip";
import { ThemeProvider } from "./ThemeProvider";
import Login from "./Login";
import Header from "./Header";
import CalculatorForm from "./CalculatorForm";
import ResultsDisplay from "./ResultsDisplay";

interface PriceData {
  pricePerMT: number;
  distance: number;
  market: "poland" | "western-europe";
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calculationData, setCalculationData] = useState<PriceData | null>(null);

  const handleLogin = (credentials: { id: string; password: string }) => {
    console.log('Login successful:', credentials.id);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logout triggered');
    setIsAuthenticated(false);
    setCalculationData(null);
  };

  const handleCalculate = (data: PriceData) => {
    console.log('Calculate triggered with:', data);
    setCalculationData(data);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light" storageKey="majra-traders-theme">
            <Login onLogin={handleLogin} />
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="majra-traders-theme">
          <div className="min-h-screen bg-background">
            <Header onLogout={handleLogout} />
            <main className="container mx-auto px-4 py-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <CalculatorForm onCalculate={handleCalculate} />
                </div>
                <div>
                  <ResultsDisplay data={calculationData} />
                </div>
              </div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;