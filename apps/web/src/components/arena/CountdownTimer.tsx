'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatTimeRemaining } from '@/lib/utils';

export default function CountdownTimer() {
  const currentRound = useArenaStore((s) => s.currentRound);
  const [time, setTime] = useState({ hours: '00', minutes: '00', seconds: '00', total: 0 });
  const [mounted, setMounted] = useState(false);

  const tick = useCallback(() => {
    if (!currentRound?.endTime) return;
    setTime(formatTimeRemaining(currentRound.endTime));
  }, [currentRound]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
      tick();
    }, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [tick]);

  if (!mounted) return <div className="h-[74px]" />; // Placeholder to avoid layout shift

  const digitStyle =
    'bg-[#080f10]/80 border border-white/[0.08] rounded-xl px-4 py-3 min-w-[60px] text-center';

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-label-mono text-[#b9cacb] text-xs tracking-[0.15em]">
        ROUND ENDS IN
      </span>
      <div className="flex items-center gap-2">
        <motion.div
          className={digitStyle}
          key={`h-${time.hours}`}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="font-display text-3xl font-bold text-[#00F0FF]">
            {time.hours}
          </span>
        </motion.div>
        <span className="text-2xl font-bold text-[#00F0FF]/50 animate-pulse">:</span>
        <motion.div
          className={digitStyle}
          key={`m-${time.minutes}`}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="font-display text-3xl font-bold text-[#00F0FF]">
            {time.minutes}
          </span>
        </motion.div>
        <span className="text-2xl font-bold text-[#00F0FF]/50 animate-pulse">:</span>
        <motion.div
          className={digitStyle}
          key={`s-${time.seconds}`}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="font-display text-3xl font-bold text-[#dbfcff]">
            {time.seconds}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
