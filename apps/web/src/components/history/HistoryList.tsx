'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatPrice } from '@/lib/utils';

export default function HistoryList() {
  const history = useArenaStore((s) => s.myHistory);

  if (history.length === 0) {
    return (
      <div className="glass-panel p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⏳</span>
        </div>
        <h3 className="text-xl font-display font-semibold text-[#dbfcff] mb-2">No History Yet</h3>
        <p className="text-[#849495]">Your arena participations will appear here once you enter a round.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {history.map((item, i) => (
        <motion.div
          key={`${item.roundId}-${i}`}
          className="glass-panel p-5 flex items-center justify-between group hover:border-[#00F0FF]/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 flex flex-col items-center justify-center border border-[#00F0FF]/20">
              <span className="text-[10px] text-[#849495] font-bold">ROUND</span>
              <span className="text-sm font-display font-bold text-[#00F0FF]">#{item.roundId}</span>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#849495] tracking-widest uppercase">PREDICTION</span>
                <span className="px-2 py-0.5 rounded bg-[#00f990]/10 text-[#00f990] text-[10px] font-bold uppercase tracking-wider border border-[#00f990]/20">ACTIVE</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-[#dbfcff]">${formatPrice(item.predictedPrice)}</span>
                <span className="text-sm text-[#849495]">XLM/USDT</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-[#849495] tracking-widest uppercase mb-1">STAKE</div>
            <div className="text-xl font-display font-bold text-[#ecb2ff]">{item.stakeAmount.toLocaleString()} XLM</div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="h-10 w-[1px] bg-white/[0.06] mx-2" />
             <button className="px-6 py-2 rounded-lg bg-white/[0.04] border border-white/[0.1] text-sm font-bold text-[#dbfcff] hover:bg-white/[0.08] transition-all">
                Details
             </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
