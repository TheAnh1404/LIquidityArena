'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prediction, Round, RoundStatus } from '@arena/types';
import { formatPrice, formatXLM } from '@/lib/utils';

interface HistoryItemDetailsProps {
  prediction: Prediction;
  round: Round | undefined;
}

export default function HistoryItemDetails({ prediction, round }: HistoryItemDetailsProps) {
  if (!round) {
    return (
      <div className="mt-4 pt-4 border-t border-white/[0.06] text-sm text-[#849495] italic">
        Detailed round data is currently unavailable.
      </div>
    );
  }

  const isResolved = round.status === RoundStatus.RESOLVED;
  const accuracy = isResolved && round.finalPrice 
    ? Math.max(0, 100 - (Math.abs(prediction.predictedPrice - round.finalPrice) / round.finalPrice) * 100)
    : null;

  const isWin = accuracy && accuracy > 99.5; // Threshold for winning? Or just show accuracy

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 pt-6 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Price Comparison */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-[#849495] tracking-widest uppercase">Round Prices</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#849495]">Entry Price</span>
              <span className="font-mono text-[#dbfcff]">${formatPrice(round.startPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#849495]">Your Prediction</span>
              <span className="font-mono text-[#00F0FF] font-bold">${formatPrice(prediction.predictedPrice)}</span>
            </div>
            {isResolved && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#849495]">Final Price</span>
                <span className="font-mono text-[#ecb2ff] font-bold">${formatPrice(round.finalPrice || 0)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-[#849495] tracking-widest uppercase">Performance</h4>
          {isResolved ? (
            <div className="space-y-2">
              <div className="text-2xl font-display font-bold text-[#00f990]">
                {accuracy?.toFixed(2)}% <span className="text-xs text-[#849495] font-normal uppercase tracking-tighter">Accuracy</span>
              </div>
              <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#00f990]"
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs text-[#849495]">Awaiting round resolution to calculate accuracy.</span>
              <div className="w-full h-1 bg-white/[0.04] rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Payout */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-[#849495] tracking-widest uppercase">Outcome</h4>
          {isResolved ? (
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[10px] text-[#849495] mb-1">FINAL PAYOUT</div>
              <div className={`text-xl font-display font-bold ${isWin ? 'text-[#00f990]' : 'text-[#849495]'}`}>
                {isWin ? '+' : ''}{formatXLM(isWin ? prediction.stakeAmount * 2 : 0)} XLM
              </div>
              <div className="text-[9px] text-[#849495] mt-1 italic">
                {isWin ? 'Prediction matched target threshold' : 'Accuracy threshold not met'}
              </div>
            </div>
          ) : (
            <div className="text-xs text-[#849495] italic">
              Round is still active or closing.
            </div>
          )}
        </div>
      </div>

      {/* Visual Timeline (Simplified) */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#849495]/40" />
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#849495]/40 to-transparent" />
        <span className="text-[9px] font-bold text-[#849495] uppercase tracking-widest">
            Round #{round.id} Detailed Record
        </span>
      </div>
    </motion.div>
  );
}
