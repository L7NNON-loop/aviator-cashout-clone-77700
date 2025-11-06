import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const CandleAnalysis = () => {
  const [candles, setCandles] = useState(["2.30x", "1.89x", "1.45x", "1.07x"]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        const newCandles = Array.from({ length: 4 }, () => 
          `${(Math.random() * 3 + 1).toFixed(2)}x`
        );
        setCandles(newCandles);
        setIsAnalyzing(false);
      }, 1500);
    }, 8000);

    setTimeout(() => setIsAnalyzing(false), 1500);

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
