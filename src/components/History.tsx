import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface HistoryItem {
  id: number;
  type: "win" | "loss";
  multiplier: string;
  time: string;
}

export const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Simulação de histórico
    const generateHistory = () => {
      const newItem: HistoryItem = {
        id: Date.now(),
        type: Math.random() > 0.4 ? "win" : "loss",
        multiplier: (Math.random() * 2 + 1).toFixed(2) + "x",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };
      setHistory((prev) => [newItem, ...prev].slice(0, 20));
    };

    const interval = setInterval(generateHistory, 12000);
    return () => clearInterval(interval);
  }, []);

  const wins = history.filter((item) => item.type === "win");
  const losses = history.filter((item) => item.type === "loss");

  const HistoryList = ({ items }: { items: HistoryItem[] }) => (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground py-8 text-sm">
          Puxe para baixo para atualizar
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-secondary rounded-lg p-3 border border-border transition-all hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              {item.type === "win" ? (
                <TrendingUp className="w-5 h-5 text-primary" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
              <div>
                <p className="font-semibold text-foreground">{item.multiplier}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded ${
                item.type === "win"
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {item.type === "win" ? "GANHO" : "PERDA"}
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-bold text-foreground mb-4">Histórico</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 bg-secondary">
          <TabsTrigger value="all">Tudo</TabsTrigger>
          <TabsTrigger value="wins">Ganho</TabsTrigger>
          <TabsTrigger value="losses">Perda</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <HistoryList items={history} />
        </TabsContent>
        <TabsContent value="wins">
          <HistoryList items={wins} />
        </TabsContent>
        <TabsContent value="losses">
          <HistoryList items={losses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
