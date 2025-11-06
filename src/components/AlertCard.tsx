import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";

export const AlertCard = ({ onOpen }: { onOpen: () => void }) => {
  const handleActivateNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          toast.success("Notificações ativadas!", {
            description: "Você receberá alertas mesmo com o app fechado.",
          });
        } else {
          toast.error("Permissão negada", {
            description: "Ative as notificações nas configurações do navegador.",
          });
        }
      });
    }
    onOpen();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
      <div className="flex items-start gap-3 mb-4">
        <Bell className="w-5 h-5 text-warning mt-1" />
        <div>
          <h3 className="font-bold text-foreground mb-1">Ative os alertas!</h3>
          <p className="text-sm text-muted-foreground">
            Para receber os sinais mesmo com o app fechado.
          </p>
        </div>
      </div>
      <Button
        onClick={handleActivateNotifications}
        className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold py-6 rounded-lg shadow-lg transition-all duration-300"
      >
        Ativar notificações
      </Button>
    </div>
  );
};
