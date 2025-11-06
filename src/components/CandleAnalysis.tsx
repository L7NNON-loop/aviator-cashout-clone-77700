import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const CandleAnalysis = () => {
  const [candles, setCandles] = useState(["2.30x", "1.89x", "1.45x", "1.07x"]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const fetchHistory = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('aviator-history');
      
      if (error) throw error;
      
      if (data?.history && Array.isArray(data.history)) {
        const formattedCandles = data.history.slice(0, 4).map((value: number) => 
          `${value.toFixed(2)}x`
        );
        setCandles(formattedCandles);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setTimeout(() => setIsAnalyzing(false), 1500);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <h2 className="text-sm font-semibold text-foreground">Analisando velas passadas</h2>
        {isAnalyzing && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {candles.map((candle, index) => {
          const value = parseFloat(candle.replace('x', ''));
          let colorClass = '';
          
          if (value >= 1.00 && value <= 1.99) {
            colorClass = 'text-blue-400 border-blue-400 bg-blue-400/10';
          } else if (value >= 2.00 && value <= 9.99) {
            colorClass = 'text-purple-600 border-purple-600 bg-purple-600/10';
          } else if (value >= 10.00) {
            colorClass = 'text-pink-500 border-pink-500 bg-pink-500/10';
          }
          
          return (
            <div
              key={index}
              className={`rounded-lg border py-1 px-2 text-center transition-all duration-300 ${colorClass}`}
            >
              <span className="font-bold text-xs">{candle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
