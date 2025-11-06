import { useState } from "react";
import { Header } from "@/components/Header";
import { CandleAnalysis } from "@/components/CandleAnalysis";
import { EntrySignal } from "@/components/EntrySignal";
import { History } from "@/components/History";
import { BetModal } from "@/components/BetModal";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [betModalOpen, setBetModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          <CandleAnalysis />
          <EntrySignal 
            onOpenBetModal={() => setBetModalOpen(true)}
          />
          <History />
        </div>
      </main>

      <Footer />

      <BetModal open={betModalOpen} onOpenChange={setBetModalOpen} />
    </div>
  );
};

export default Index;
