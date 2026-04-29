'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { getStatusColor, formatPrice } from '@/lib/utils';

export default function MyStrategyPanel() {
  const price = useArenaStore((s) => s.price);
  const stake = useArenaStore((s) => s.stake);
  const status = useArenaStore((s) => s.status);
  const multiplier = useArenaStore((s) => s.multiplier);
  const canClaim = useArenaStore((s) => s.canClaim);
  const claimReward = useArenaStore((s) => s.claimReward);
  const myHistory = useArenaStore((s) => s.myHistory);
  const leaderboard = useArenaStore((s) => s.leaderboard);
  const walletAddress = useArenaStore((s) => s.wallet.address);
  const sc = getStatusColor(status);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  // Dynamic calculations
  const myLeaderboardEntry = leaderboard.find(e => e.address === walletAddress);
  const totalProfit = myLeaderboardEntry ? myLeaderboardEntry.profit : 0;
  
  const totalUsers = leaderboard.length || 1;
  const myRank = myLeaderboardEntry ? myLeaderboardEntry.rank : totalUsers;
  // If rank 1 of 10 -> outperforming 90% (1 - 1/10)
  const alphaPercentage = Math.round((1 - (myRank / totalUsers)) * 100) || 5;

  const execs = myHistory.slice(0, 3).map(h => ({
    action: `Predicted $${h.predictedPrice.toFixed(4)}`,
    time: 'Recent',
    detail: `${h.stakeAmount} XLM`
  }));

  return (
    <motion.div id="strategy-panel" className="glass-panel p-6"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-xl font-semibold text-[#dbfcff]">My Arena Strategy</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${sc.text} ${sc.bg} ${sc.border} border`}>{status}</span>
      </div>

      <div className="glass-panel-high p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-lg font-semibold text-[#dbfcff]">XLM Long Strategy</span>
          <span className={`font-display text-lg font-bold ${totalProfit >= 0 ? 'text-[#00f990]' : 'text-red-500'}`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString()} XLM
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-1">MY PREDICTION</span>
            <span className="font-display text-lg font-semibold text-[#00F0FF]">${formatPrice(price)}</span>
          </div>
          <div>
            <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-1">STAKE</span>
            <span className="font-display text-lg font-semibold text-[#ecb2ff]">{stake.toLocaleString()} XLM</span>
          </div>
          <div>
            <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-1">LEVERAGE</span>
            <span className="font-display text-lg font-semibold text-[#dbfcff]">{multiplier}x</span>
          </div>
        </div>
      </div>

      <div className="border-glow-emerald rounded-xl p-4 mb-4">
        <span className="text-xs font-bold text-[#00f990] uppercase tracking-wider">✦ Alpha Achieved</span>
        <p className="text-sm text-[#b9cacb] mt-1">You are outperforming {alphaPercentage}% of traders this round</p>
        <div className="mt-2 w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#00f990] to-[#00F0FF]"
            initial={{ width: 0 }} animate={{ width: `${alphaPercentage}%` }} transition={{ duration: 1.2, delay: 0.6 }} />
        </div>
      </div>

      <div className="border border-[#FFD700]/20 bg-[#FFD700]/5 rounded-xl p-4 mb-4">
        <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">⚠ Whale Dump Alert</span>
        <p className="text-xs text-[#b9cacb] leading-relaxed mt-1">A wallet with 1.2M XLM moved funds to Binance. Volatility expected within 15 mins.</p>
      </div>

      {canClaim && (
        <motion.button
          onClick={claimReward}
          className="w-full py-4 mb-4 rounded-xl bg-gradient-to-r from-[#00f990] to-[#00F0FF] text-[#0d1515] font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(0,249,144,0.4)] hover:shadow-[0_0_30px_rgba(0,249,144,0.6)] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✦ Claim Reward ✦
        </motion.button>
      )}

      <div>
        <span className="text-label-mono text-xs text-[#849495] tracking-[0.15em] block mb-3">RECENT EXECUTIONS</span>
        <div className="flex flex-col gap-2">
          {execs.length > 0 ? execs.map((e, i) => (
            <motion.div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
              <div>
                <span className="text-sm font-medium text-[#dbfcff]">{e.action}</span>
                <span className="text-[10px] text-[#849495] block mt-0.5">{e.time}</span>
              </div>
              <span className={`text-sm font-display font-semibold ${e.detail.startsWith('+') ? 'text-[#00f990]' : 'text-[#b9cacb]'}`}>{e.detail}</span>
            </motion.div>
          )) : (
            <div className="text-center p-4 text-[#849495] text-xs italic">
              No recent executions
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
        <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-1">LOGIC MODEL</span>
        <p className="text-xs text-[#b9cacb]">EMA Crossover + Fibonacci Retracement (0.618 level). Adaptive weighting enabled.</p>
      </div>
    </motion.div>
  );
}
