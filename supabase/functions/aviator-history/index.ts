import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gera multiplicadores realistas do Aviator
function generateRealisticMultiplier(): number {
  const random = Math.random();
  
  // 40% chance de 1.00x - 2.00x (baixo)
  if (random < 0.4) {
    return parseFloat((1 + Math.random()).toFixed(2));
  }
  // 35% chance de 2.00x - 5.00x (médio)
  else if (random < 0.75) {
    return parseFloat((2 + Math.random() * 3).toFixed(2));
  }
  // 20% chance de 5.00x - 10.00x (alto)
  else if (random < 0.95) {
    return parseFloat((5 + Math.random() * 5).toFixed(2));
  }
  // 5% chance de 10.00x+ (muito alto)
  else {
    return parseFloat((10 + Math.random() * 40).toFixed(2));
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating realistic Aviator history...');
    
    // Gera histórico realista
    const history = Array.from({ length: 10 }, () => generateRealisticMultiplier());
    
    console.log('History generated:', history);
    
    return new Response(JSON.stringify({ history }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating history:', error);
    
    return new Response(JSON.stringify({ 
      history: [2.30, 1.89, 1.45, 1.07, 3.50, 2.10, 1.55, 4.20, 1.80, 2.90] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
