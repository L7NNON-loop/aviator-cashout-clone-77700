import { useState } from "react";
import { Header } from "@/components/Header";
import { CandleAnalysis } from "@/components/CandleAnalysis";
import { EntrySignal } from "@/components/EntrySignal";
import { History } from "@/components/History";
import { AlertCard } from "@/components/AlertCard";
import { BetModal } from "@/components/BetModal";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [betModalOpen, setBetModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          <CandleAnalysis />
          <EntrySignal 
            onOpenBetModal={() => setBetModalOpen(true)}
            onOpenAlertModal={() => setAlertModalOpen(true)}
          />
          <History />
          <AlertCard onOpen={() => setAlertModalOpen(true)} />
        </div>
      </main>

      <Footer />

      <BetModal open={betModalOpen} onOpenChange={setBetModalOpen} />
      <WhatsAppModal open={alertModalOpen} onOpenChange={setAlertModalOpen} />
    </div>
  );
};

export default Index;
