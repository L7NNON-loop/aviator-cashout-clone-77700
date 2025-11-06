import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gera multiplicadores realistas
function generateRealisticMultiplier(): number {
  const random = Math.random();
  if (random < 0.4) return parseFloat((1 + Math.random()).toFixed(2));
  else if (random < 0.75) return parseFloat((2 + Math.random() * 3).toFixed(2));
  else if (random < 0.95) return parseFloat((5 + Math.random() * 5).toFixed(2));
  else return parseFloat((10 + Math.random() * 40).toFixed(2));
}

// Análise avançada de padrões (mesma lógica do site original)
function analyzePattern(history: number[]): { shouldEnter: boolean; cashout: number; attempts: number; countdown: number } {
  if (history.length < 4) {
    return { shouldEnter: false, cashout: 2.0, attempts: 1, countdown: 0 };
  }

  const lastFour = history.slice(0, 4);
  const lastSix = history.slice(0, 6);
  const average = lastFour.reduce((a, b) => a + b, 0) / lastFour.length;
  
  // Padrão 1: Sequência de velas baixas (3+ velas < 2.00x)
  const lowCandles = lastFour.filter(x => x < 2.0).length;
  if (lowCandles >= 3) {
    const targetCashout = Math.max(2.0, parseFloat((average * 1.8).toFixed(2)));
    return {
      shouldEnter: true,
      cashout: Math.min(targetCashout, 3.5),
      attempts: 2,
      countdown: Math.floor(Math.random() * 2) + 2
    };
  }

  // Padrão 2: Tendência crescente
  let isIncreasing = true;
  for (let i = 0; i < lastFour.length - 1; i++) {
    if (lastFour[i] >= lastFour[i + 1]) {
      isIncreasing = false;
      break;
    }
  }
  if (isIncreasing) {
    return {
      shouldEnter: true,
      cashout: parseFloat((lastFour[0] * 1.3).toFixed(2)),
      attempts: 1,
      countdown: Math.floor(Math.random() * 2) + 1
    };
  }

  // Padrão 3: Vela muito alta recente (> 5.00x)
  const hasVeryHigh = lastFour.some(x => x > 5.0);
  if (hasVeryHigh) {
    return {
      shouldEnter: true,
      cashout: 2.2,
      attempts: 2,
      countdown: Math.floor(Math.random() * 3) + 2
    };
  }

  // Padrão 4: Alternância (alto-baixo-alto-baixo)
  const isAlternating = (lastFour[0] > 2.5 && lastFour[1] < 2.0 && lastFour[2] > 2.5) ||
                        (lastFour[0] < 2.0 && lastFour[1] > 2.5 && lastFour[2] < 2.0);
  if (isAlternating) {
    return {
      shouldEnter: true,
      cashout: 2.8,
      attempts: 1,
      countdown: Math.floor(Math.random() * 2) + 2
    };
  }

  // Padrão 5: Média estável (1.5x - 2.5x)
  if (average >= 1.5 && average <= 2.5) {
    const volatility = Math.max(...lastFour) - Math.min(...lastFour);
    if (volatility < 1.5) {
      return {
        shouldEnter: true,
        cashout: parseFloat((average + 0.7).toFixed(2)),
        attempts: 1,
        countdown: Math.floor(Math.random() * 3) + 1
      };
    }
  }

  // Padrão 6: Recuperação após crash muito baixo
  const hasVeryLow = lastFour.some(x => x < 1.2);
  if (hasVeryLow && lastFour[0] > 1.5) {
    return {
      shouldEnter: true,
      cashout: 2.5,
      attempts: 2,
      countdown: Math.floor(Math.random() * 2) + 2
    };
  }

  // Sem padrão claro - gera sinal conservador ocasionalmente
  if (Math.random() > 0.6) {
    return {
      shouldEnter: true,
      cashout: 2.0,
      attempts: 1,
      countdown: Math.floor(Math.random() * 3) + 2
    };
  }

  return { shouldEnter: false, cashout: 2.0, attempts: 1, countdown: 0 };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Analyzing Aviator patterns...');
    
    // Gera histórico realista
    const history = Array.from({ length: 10 }, () => generateRealisticMultiplier());
    console.log('History:', history.slice(0, 4));
    
    // Analisa padrões
    const signal = analyzePattern(history);
    console.log('Signal generated:', signal);

    return new Response(JSON.stringify(signal), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing patterns:', error);
    
    return new Response(JSON.stringify({
      shouldEnter: true,
      cashout: 2.5,
      attempts: 1,
      countdown: 3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
