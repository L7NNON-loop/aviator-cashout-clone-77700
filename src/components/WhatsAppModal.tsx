import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WhatsAppModal = ({ open, onOpenChange }: WhatsAppModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-2 border-primary/50 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            <DialogTitle className="text-xl font-bold">GRUPO OFICIAL WHATSAPP</DialogTitle>
          </div>
          <DialogDescription className="text-foreground text-base leading-relaxed">
            Entre agora no grupo de WhatsApp e tenha acesso a dicas exclusivas, outros bots 100%
            assertivos e suporte 24/24 para tirar todas as suas dúvidas.
            <br />
            <br />
            No grupo você encontra tudo o que precisa para ganhar no Aviator todos os dias com
            segurança.
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => {
            window.open("https://chat.whatsapp.com/exemplo", "_blank");
          }}
          className="w-full bg-primary hover:bg-primary/90 font-bold py-6 text-lg"
        >
          ENTRAR NO GRUPO AGORA
        </Button>
      </DialogContent>
    </Dialog>
  );
};
