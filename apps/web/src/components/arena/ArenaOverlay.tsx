'use client';

import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import CountdownTimer from './CountdownTimer';
import PoolDisplay from './PoolDisplay';

export default function ArenaOverlay() {
  const currentRound = useArenaStore((s) => s.currentRound);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative flex flex-col items-center gap-4 lg:gap-6 pointer-events-auto">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="tag-live">Live</span>
        </motion.div>

        {/* Round info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-label-mono text-[10px] lg:text-xs text-[#849495] tracking-[0.2em]">
            ARENA ROUND
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-gradient-primary mt-1">
            #{currentRound?.id || '---'}
          </h2>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Pool Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <PoolDisplay />
        </motion.div>

        {/* XLM pair label */}
        <motion.div
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-label-mono text-xs text-[#849495] tracking-[0.2em]">
            XLM / USDT
          </span>
        </motion.div>
      </div>
    </div>
  );
}
