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
      <DialogContent className="bg-gradient-to-br from-card to-card/95 border-2 border-primary/30 sm:max-w-md rounded-[20px] shadow-2xl">
        <DialogHeader className="space-y-6 pt-4">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-6 rounded-full shadow-lg">
              <AlertTriangle className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            ChatIA.aviator
          </DialogTitle>
          <DialogDescription className="text-foreground/90 text-center text-base leading-relaxed space-y-5 px-4">
            <p className="font-medium text-base">
              Para o uso funcional corretamente do <span className="text-primary font-bold">ChatIA.aviator</span>
            </p>
            <p className="text-sm leading-relaxed">
              Uma inteligência que não existe igual, para que analise suas entradas e <span className="text-primary font-bold">garanta 100% o sucesso</span> das suas jogadas.
            </p>
            <div className="bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/40 rounded-[15px] p-6 mt-4 shadow-inner">
              <p className="font-bold text-primary text-base leading-relaxed">
                📍 Crie uma conta e deposite no mínimo 50 MT
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4 pb-2">
          <Button
            onClick={scrollToCasino}
            className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-bold py-6 rounded-[15px] shadow-lg text-base transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]"
          >
            🎰 Ir para Casino
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-2 border-primary/30 hover:bg-primary/5 rounded-[15px] py-5 font-semibold text-foreground transition-all duration-300"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
