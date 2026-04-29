'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatPrice } from '@/lib/utils';
import { RoundStatus } from '@arena/types';
import HistoryItemDetails from './HistoryItemDetails';

export default function HistoryList() {
  const history = useArenaStore((s) => s.myHistory);
  const pastRounds = useArenaStore((s) => s.pastRounds);
  const currentRound = useArenaStore((s) => s.currentRound);
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4">
      {history.map((item, i) => {
        const round = item.roundId === currentRound?.id ? currentRound : pastRounds[item.roundId];
        const status = round?.status || RoundStatus.OPEN;
        const isExpanded = expandedId === `${item.roundId}-${i}`;

        return (
          <motion.div
            key={`${item.roundId}-${i}`}
            className={`glass-panel p-5 flex flex-col transition-all duration-300 ${
              isExpanded ? 'border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'hover:border-[#00F0FF]/20'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 flex flex-col items-center justify-center border border-[#00F0FF]/20 shrink-0">
                  <span className="text-[10px] text-[#849495] font-bold">ROUND</span>
                  <span className="text-sm font-display font-bold text-[#00F0FF]">#{item.roundId}</span>
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] lg:text-xs font-bold text-[#849495] tracking-widest uppercase">PREDICTION</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold uppercase tracking-wider border ${
                      status === RoundStatus.OPEN 
                        ? 'bg-[#00f990]/10 text-[#00f990] border-[#00f990]/20' 
                        : status === RoundStatus.CLOSED 
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20'
                        : 'bg-white/[0.06] text-[#849495] border-white/[0.1]'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl lg:text-2xl font-display font-bold text-[#dbfcff]">${formatPrice(item.predictedPrice)}</span>
                    <span className="text-xs lg:text-sm text-[#849495] truncate">XLM/USDT</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="sm:text-right">
                  <div className="text-[10px] lg:text-xs font-bold text-[#849495] tracking-widest uppercase mb-1">STAKE</div>
                  <div className="text-lg lg:text-xl font-display font-bold text-[#ecb2ff]">{item.stakeAmount.toLocaleString()} XLM</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block h-10 w-[1px] bg-white/[0.06] mx-2" />
                  <button 
                    onClick={() => toggleExpand(`${item.roundId}-${i}`)}
                    className={`px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-bold transition-all border ${
                      isExpanded 
                        ? 'bg-[#00F0FF]/20 border-[#00F0FF]/40 text-[#00F0FF]' 
                        : 'bg-white/[0.04] border-white/[0.1] text-[#dbfcff] hover:bg-white/[0.08]'
                    }`}
                  >
                      {isExpanded ? 'Close' : 'Details'}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <HistoryItemDetails 
                  prediction={item} 
                  round={round} 
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
