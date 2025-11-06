import { Rocket } from "lucide-react";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";

export const Header = () => {
  const onlineCount = useOnlineUsers();
  
  return (
    <header className="bg-card border-b border-border px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Sistema Cashout</h1>
            <p className="text-xs text-muted-foreground">Aguarde entrada</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-sm font-semibold text-primary">{onlineCount} online</span>
        </div>
      </div>
    </header>
  );
};
