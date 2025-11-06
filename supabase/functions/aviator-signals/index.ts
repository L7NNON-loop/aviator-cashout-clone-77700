import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Análise de padrões do Aviator
function analyzePattern(history: number[]): { shouldEnter: boolean; cashout: number; attempts: number } {
  if (history.length < 4) {
    return { shouldEnter: false, cashout: 2.0, attempts: 1 };
  }

  const lastFour = history.slice(0, 4);
  const average = lastFour.reduce((a, b) => a + b, 0) / lastFour.length;
  
  // Padrão 1: Após 3 velas baixas (< 2x), há tendência de vela alta
  const lowCandles = lastFour.filter(x => x < 2.0).length;
  if (lowCandles >= 3) {
    return {
      shouldEnter: true,
      cashout: parseFloat((average * 1.5).toFixed(2)),
      attempts: 2
    };
  }

  // Padrão 2: Sequência crescente
  const isIncreasing = lastFour[0] < lastFour[1] && lastFour[1] < lastFour[2];
  if (isIncreasing) {
    return {
      shouldEnter: true,
      cashout: parseFloat((lastFour[2] * 1.2).toFixed(2)),
      attempts: 1
    };
  }

  // Padrão 3: Após vela muito alta (>5x), tendência de normalização
  const hasVeryHigh = lastFour.some(x => x > 5.0);
  if (hasVeryHigh) {
    return {
      shouldEnter: true,
      cashout: 2.5,
      attempts: 2
    };
  }

  // Padrão 4: Média estável sugere entrada conservadora
  if (average >= 1.5 && average <= 2.5) {
    return {
      shouldEnter: true,
      cashout: parseFloat((average + 0.5).toFixed(2)),
      attempts: 1
    };
  }

  return { shouldEnter: false, cashout: 2.0, attempts: 1 };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Analyzing Aviator patterns...');
    
    // Busca histórico
    const historyResponse = await fetch('https://aviator.spribegaming.com/api/games/history', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    let history: number[] = [];
    
    if (historyResponse.ok) {
      const data = await historyResponse.json();
      history = data.results?.map((game: any) => game.odds) || [];
      console.log('History fetched:', history.slice(0, 4));
    } else {
      // Fallback: gera histórico simulado
      history = Array.from({ length: 10 }, () => 
        parseFloat((Math.random() * 3 + 1).toFixed(2))
      );
      console.log('Using fallback history');
    }

    // Analisa padrões
    const signal = analyzePattern(history);
    
    console.log('Signal generated:', signal);

    return new Response(JSON.stringify(signal), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing patterns:', error);
    
    // Fallback
    return new Response(JSON.stringify({
      shouldEnter: true,
      cashout: 2.5,
      attempts: 1
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
