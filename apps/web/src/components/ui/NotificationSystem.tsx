'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { WsEvent, RoundStatus } from '@arena/types';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useArenaStore((s) => s.socket);
  const status = useArenaStore((s) => s.status);

  const addNotification = (notif: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { ...notif, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(WsEvent.ROUND_UPDATE, (payload) => {
      if (payload.status === RoundStatus.OPEN) {
        addNotification({
          type: 'info',
          title: `ROUND #${payload.id} OPEN`,
          message: 'Place your predictions now! The arena is heating up.',
        });
      }
    });

    return () => {
      socket.off(WsEvent.ROUND_UPDATE);
    };
  }, [socket]);

  const canClaim = useArenaStore((s) => s.canClaim);

  // Win detection
  useEffect(() => {
    if (canClaim) {
        addNotification({
            type: 'success',
            title: 'VICTORY ACHIEVED',
            message: 'Your prediction was accurate! Claim your XLM reward now.',
        });
    }
  }, [canClaim]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl w-[calc(100vw-2rem)] sm:w-[350px] shadow-2xl ${
              n.type === 'success' ? 'bg-[#00f990]/10 border-[#00f990]/30' :
              n.type === 'warning' ? 'bg-[#FFD700]/10 border-[#FFD700]/30' :
              'bg-[#00F0FF]/10 border-[#00F0FF]/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                n.type === 'success' ? 'bg-[#00f990]/20 text-[#00f990]' :
                n.type === 'warning' ? 'bg-[#FFD700]/20 text-[#FFD700]' :
                'bg-[#00F0FF]/20 text-[#00F0FF]'
              }`}>
                {n.type === 'success' ? '🏆' : n.type === 'warning' ? '⚠️' : '⚡'}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-1">{n.title}</h4>
                <p className="text-xs text-[#b9cacb] leading-relaxed">{n.message}</p>
              </div>
            </div>
            <motion.div 
                className={`absolute bottom-0 left-0 h-0.5 ${
                    n.type === 'success' ? 'bg-[#00f990]' :
                    n.type === 'warning' ? 'bg-[#FFD700]' :
                    'bg-[#00F0FF]'
                }`}
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
