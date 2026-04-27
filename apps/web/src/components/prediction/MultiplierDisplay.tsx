'use client';

import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';

export default function MultiplierDisplay() {
  const multiplier = useArenaStore((s) => s.multiplier);
  const stake = useArenaStore((s) => s.stake);
  const potentialWin = stake * multiplier;

  return (
    <motion.div
      className="glass-panel-glow p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        {/* Multiplier */}
        <div className="flex flex-col">
          <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em]">
            MULTIPLIER
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <motion.span
              key={multiplier}
              className="font-display text-3xl font-bold text-gradient-primary"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {multiplier}x
            </motion.span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center px-4">
          <svg
            width="32"
            height="16"
            viewBox="0 0 32 16"
            className="text-[#00F0FF]/40"
          >
            <path
              d="M0 8 L24 8 M20 3 L26 8 L20 13"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Potential win */}
        <div className="flex flex-col items-end">
          <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em]">
            POTENTIAL WIN
          </span>
          <motion.span
            key={potentialWin}
            className="font-display text-2xl font-bold text-[#00f990] mt-1"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {potentialWin.toLocaleString('en-US', { maximumFractionDigits: 0 })} XLM
          </motion.span>
        </div>
      </div>

      {/* Risk bar */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-[10px] text-[#849495] uppercase tracking-wider">Risk</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                multiplier < 3
                  ? '#00f990'
                  : multiplier < 6
                  ? '#FFD700'
                  : '#FF4B2B',
              width: `${Math.min(100, (multiplier / 12) * 100)}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (multiplier / 12) * 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color:
              multiplier < 3
                ? '#00f990'
                : multiplier < 6
                ? '#FFD700'
                : '#FF4B2B',
          }}
        >
          {multiplier < 3 ? 'LOW' : multiplier < 6 ? 'MEDIUM' : 'HIGH'}
        </span>
      </div>
    </motion.div>
  );
}
