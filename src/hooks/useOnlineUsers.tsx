import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const getBaseUserCount = () => {
  const hour = new Date().getHours();
  
  if (hour >= 0 && hour < 6) {
    return Math.floor(Math.random() * 201) + 100; // 100-300
  } else if (hour >= 6 && hour < 12) {
    return Math.floor(Math.random() * 300) + 301; // 301-600
  } else if (hour >= 12 && hour < 17) {
    return Math.floor(Math.random() * 91) + 610; // 610-700
  } else {
    return Math.floor(Math.random() * 401) + 800; // 800-1200
  }
};

export const useOnlineUsers = () => {
  const [baseCount] = useState(getBaseUserCount());
  const [realUsers, setRealUsers] = useState(0);

  useEffect(() => {
    const roomId = 'aviator-users';
    const userId = crypto.randomUUID();
    
    const channel = supabase.channel(roomId);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setRealUsers(count);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        console.log('User joined:', key);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
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

  return baseCount + realUsers;
};
