'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LeaderboardRowProps {
  rank: number;
  address: string;
  title: string;
  accuracy: number;
  profit: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardRow({
  rank,
  address,
  title,
  accuracy,
  profit,
  isCurrentUser = false,
}: LeaderboardRowProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const rankColors: Record<number, string> = {
    1: 'text-[#FFD700]',
    2: 'text-[#C0C0C0]',
    3: 'text-[#CD7F32]',
  };

  return (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        isCurrentUser
          ? 'glass-panel-glow border-[#00F0FF]/20'
          : 'bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04]'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Rank */}
      <div className="w-10 flex-shrink-0 text-center">
        {rank <= 3 ? (
          <span className={`font-display text-xl font-bold ${rankColors[rank]}`}>
            #{rank}
          </span>
        ) : (
          <span className="font-display text-lg font-semibold text-[#849495]">
            #{rank}
          </span>
        )}
      </div>

      {/* Avatar placeholder */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          isCurrentUser
            ? 'bg-gradient-to-br from-[#00F0FF] to-[#BD00FF] text-white'
            : 'bg-white/[0.08] text-[#b9cacb]'
        }`}
      >
        {address.slice(0, 2)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-[#dbfcff] truncate">
            {address}
          </span>
          {isCurrentUser && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] font-semibold tracking-wider">
              YOU
            </span>
          )}
        </div>
        <span className="text-xs text-[#849495] hidden sm:block">{title}</span>
      </div>

      {/* Accuracy */}
      <div className="text-right flex-shrink-0">
        <span className="font-display text-sm font-semibold text-[#ecb2ff]">
          {accuracy}%
        </span>
        <span className="block text-[10px] text-[#849495]">ACCURACY</span>
      </div>

      {/* Profit */}
      <div className="text-right flex-shrink-0 min-w-[80px]">
        <span
          className={`font-display text-sm font-bold ${
            profit >= 0 ? 'text-[#00f990]' : 'text-[#FF4B2B]'
          }`}
        >
          {profit >= 0 ? '+' : ''}
          {mounted ? profit.toLocaleString() : profit} XLM
        </span>
      </div>
    </motion.div>
  );
}
