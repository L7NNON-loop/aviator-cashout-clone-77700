import { Brain } from "lucide-react";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";

export const Header = () => {
  const onlineCount = useOnlineUsers();
  
  return (
    <header className="bg-gradient-to-r from-card via-primary/5 to-card border-b-2 border-primary/30 px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-2 rounded-xl border border-primary/30">
            <Brain className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-[10px] border border-primary/30">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span style={{ fontSize: '10px' }} className="font-semibold text-primary whitespace-nowrap">{onlineCount} online</span>
        </div>
      </div>
    </header>
  );
};
