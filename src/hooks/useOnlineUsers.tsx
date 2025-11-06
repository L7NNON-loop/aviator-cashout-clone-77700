import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    const roomId = 'aviator-users';
    const userId = crypto.randomUUID();
    
    const channel = supabase.channel(roomId);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setOnlineCount(count);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, []);

  return onlineCount;
};
