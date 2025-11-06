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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-2 border-warning/50 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <DialogTitle className="text-xl font-bold">⚠️ AVISO IMPORTANTE</DialogTitle>
          </div>
          <DialogDescription className="text-foreground text-base leading-relaxed">
            Para usar o sistema corretamente, é necessário estar conectado à casa de apostas onde
            o sistema funciona. Caso ainda não possua uma conta, crie a sua através do botão abaixo
            e garanta o acesso completo ao sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Fechar
          </Button>
          <Button
            onClick={() => {
              window.open("https://media1.placard.co.mz/redirect.aspx?pid=3319&bid=1690", "_blank");
            }}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Criar Conta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
