export const History = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 rounded-2xl p-4 shadow-2xl overflow-hidden">
      <h2 className="text-lg font-bold text-foreground mb-4 text-center">Estatísticas em Tempo Real</h2>
      <div className="rounded-xl overflow-hidden border-2 border-primary/20 shadow-inner">
        <iframe
          src="https://sshortly.net/18839e8"
          className="w-full h-[400px] border-0"
          title="Estatísticas Aviator"
          loading="lazy"
        />
      </div>
    </div>
  );
};
