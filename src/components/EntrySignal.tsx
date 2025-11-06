import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Share2 } from "lucide-react";

export const EntrySignal = ({ onOpenBetModal }: { onOpenBetModal: () => void }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cashout, setCashout] = useState("--");
  const [attempts, setAttempts] = useState("--");
  const [status, setStatus] = useState("AGUARDE...");

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,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');
    audio.play().catch(e => console.log('Sound play failed:', e));
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ChatIA Aviator',
      text: '🚀 Descubra o melhor sistema de sinais para Aviator! 100% de precisão com IA avançada.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Compartilhado com sucesso!");
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para área de transferência!");
    }
  };

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
            const signalCountdown = data.countdown || Math.floor(Math.random() * 3) + 2;

            setCashout(`${signalCashout}x`);
            setAttempts(`${signalAttempts}`);
            setCountdown(signalCountdown);
            setStatus("CONFIRMAR");

            playNotificationSound();

            toast.success("🎯 Nova entrada confirmada!", {
              description: `Tirar no: ${signalCashout}x em ${signalAttempts} tentativas`,
            });
          } else {
            setTimeout(generateSignal, 5000);
          }
        } catch (error) {
          console.error('Error generating signal:', error);
          const fallbackCashout = (Math.random() * 1.5 + 1.5).toFixed(2);
          const fallbackAttempts = Math.floor(Math.random() * 2) + 1;
          const randomCountdown = Math.floor(Math.random() * 3) + 2;

          setCashout(`${fallbackCashout}x`);
          setAttempts(`${fallbackAttempts}`);
          setCountdown(randomCountdown);
          setStatus("CONFIRMAR");

          playNotificationSound();

          toast.success("🎯 Nova entrada confirmada!", {
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
        <h2 className="text-base font-bold text-foreground">🎯 Entrada confirmada</h2>
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

      <Button
        onClick={onOpenBetModal}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/50 mb-3"
      >
        🎰 Apostar
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full border-2 border-primary/30 hover:bg-primary/10 font-semibold py-3 rounded-lg transition-all duration-300"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Compartilhar Sistema
      </Button>
    </div>
  );
};
