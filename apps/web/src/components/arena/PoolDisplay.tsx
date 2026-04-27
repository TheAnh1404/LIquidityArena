'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatXLM } from '@/lib/utils';

export default function PoolDisplay() {
  const totalPool = useArenaStore((s) => s.totalPool);
  const activeUsers = useArenaStore((s) => s.activeUsers);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="flex gap-8 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Total Pool */}
      <div className="glass-panel-glow px-6 py-4 text-center">
        <span className="text-label-mono text-xs text-[#b9cacb] tracking-[0.15em] block mb-1">
          TOTAL POOL
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-[#00F0FF]">
            {mounted ? formatXLM(totalPool) : '0'}
          </span>
          <span className="text-sm text-[#b9cacb]">XLM</span>
        </div>
      </div>

      {/* Active Fighters */}
      <div className="glass-panel px-6 py-4 text-center">
        <span className="text-label-mono text-xs text-[#b9cacb] tracking-[0.15em] block mb-1">
          ACTIVE FIGHTERS
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-[#ecb2ff]">
            {mounted ? activeUsers.toLocaleString() : '0'}
          </span>
          <span className="text-sm text-[#b9cacb]">online</span>
        </div>
      </div>
    </motion.div>
  );
}
