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
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <h2 className="text-sm font-semibold text-foreground">Analisando velas</h2>
        {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {candles.map((candle, index) => (
          <div
            key={index}
            className="bg-multiplier-bg border border-multiplier/30 rounded-lg py-3 px-2 text-center transition-all duration-300 hover:border-multiplier/60"
          >
            <span className="text-multiplier font-bold text-lg">{candle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
