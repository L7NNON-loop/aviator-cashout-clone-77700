import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface BetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BetModal = ({ open, onOpenChange }: BetModalProps) => {
  const scrollToCasino = () => {
    const casinoElement = document.getElementById('casino-iframe');
    if (casinoElement) {
      casinoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/40 sm:max-w-lg rounded-3xl shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-primary/20 p-4 rounded-full">
              <AlertTriangle className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            💎 ChatIA.aviator Premium
          </DialogTitle>
          <DialogDescription className="text-foreground text-center text-base leading-relaxed space-y-4 px-2">
            <p className="font-semibold text-lg">
              Para o uso funcional correto do <span className="text-primary font-bold">ChatIA.aviator</span>
            </p>
            <p>
              Uma inteligência artificial única que analisa suas entradas e <span className="text-primary font-bold">garante 100% o sucesso</span> das suas jogadas.
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 mt-4">
              <p className="font-bold text-primary text-lg">
                📍 Crie uma conta e deposite no mínimo 50 MT
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={scrollToCasino}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold py-6 rounded-2xl shadow-lg text-lg transition-all duration-300 hover:shadow-primary/50 hover:scale-105"
          >
            🎰 Ir para Casino
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-2 border-border hover:bg-secondary rounded-2xl py-5 font-semibold"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
