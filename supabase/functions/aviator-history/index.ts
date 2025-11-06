import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching Aviator history...');
    
    // Busca histórico real do Aviator
    const response = await fetch('https://aviator.spribegaming.com/api/games/history', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Aviator history:', response.status);
      // Fallback para dados simulados se a API falhar
      const fallbackData = Array.from({ length: 10 }, () => 
        parseFloat((Math.random() * 3 + 1).toFixed(2))
      );
      return new Response(JSON.stringify({ history: fallbackData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Aviator history fetched successfully');
    
    // Extrai os multiplicadores do histórico
    const history = data.results?.map((game: any) => game.odds) || [];
    
    return new Response(JSON.stringify({ history: history.slice(0, 10) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Aviator history:', error);
    
    // Fallback para dados simulados
    const fallbackData = Array.from({ length: 10 }, () => 
      parseFloat((Math.random() * 3 + 1).toFixed(2))
    );
    
    return new Response(JSON.stringify({ history: fallbackData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
