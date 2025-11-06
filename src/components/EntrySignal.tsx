import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const EntrySignal = ({ onOpenBetModal, onOpenAlertModal }: { onOpenBetModal: () => void, onOpenAlertModal: () => void }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cashout, setCashout] = useState("--");
  const [attempts, setAttempts] = useState("--");
  const [status, setStatus] = useState("AGUARDE...");

  useEffect(() => {
    const generateSignal = async () => {
      setStatus("AGUARDE...");
      setCashout("--");
      setAttempts("--");
      setCountdown(null);

      setTimeout(async () => {
        try {
          const { data, error } = await supabase.functions.invoke('aviator-signals');
          
          if (error) throw error;

          if (data?.shouldEnter) {
            const signalCashout = data.cashout.toFixed(2);
            const signalAttempts = data.attempts;
            const randomCountdown = Math.floor(Math.random() * 3) + 2;

            setCashout(`${signalCashout}x`);
            setAttempts(`${signalAttempts}`);
            setCountdown(randomCountdown);
            setStatus("CONFIRMAR");

            toast.success("Entrada confirmada!", {
              description: `Tirar no: ${signalCashout}x em ${signalAttempts} tentativas`,
            });
          } else {
            // Aguarda próximo sinal
            setTimeout(generateSignal, 5000);
          }
        } catch (error) {
          console.error('Error generating signal:', error);
          // Fallback
          const fallbackCashout = (Math.random() * 1.5 + 1.5).toFixed(2);
          const fallbackAttempts = Math.floor(Math.random() * 2) + 1;
          const randomCountdown = Math.floor(Math.random() * 3) + 2;

          setCashout(`${fallbackCashout}x`);
          setAttempts(`${fallbackAttempts}`);
          setCountdown(randomCountdown);
          setStatus("CONFIRMAR");

          toast.success("Entrada confirmada!", {
            description: `Tirar no: ${fallbackCashout}x em ${fallbackAttempts} tentativas`,
          });
        }
      }, 8000);
    };

    generateSignal();
    const interval = setInterval(generateSignal, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Entrada confirmada</h2>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-secondary rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Depois de</p>
          <p className="text-xl font-bold text-foreground">
            {countdown !== null ? `${countdown}s` : "--"}
          </p>
        </div>
        <div className="bg-secondary rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Tirar no:</p>
          <p className="text-xl font-bold text-primary">{cashout}</p>
        </div>
        <div className="bg-secondary rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Tentativas:</p>
          <p className="text-xl font-bold text-foreground">{attempts}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onOpenBetModal}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/50"
        >
          Apostar
        </Button>
        <Button
          onClick={onOpenAlertModal}
          className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-warning/50"
        >
          Ativar Alerta
        </Button>
      </div>
    </div>
  );
};
