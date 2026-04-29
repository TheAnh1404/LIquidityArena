'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LeaderboardRow from './LeaderboardRow';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatXLM } from '@/lib/utils';

// Mock data removed, now using backend data

export default function Leaderboard() {
  const totalPool = useArenaStore((s) => s.totalPool);
  const activeUsers = useArenaStore((s) => s.activeUsers);
  const leaderboard = useArenaStore((s) => s.leaderboard);
  const walletAddress = useArenaStore((s) => s.wallet.address);

  return (
    <motion.div
      id="leaderboard"
      className="glass-panel p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/leaderboard" className="group">
            <h3 className="font-display text-xl font-semibold text-[#dbfcff] flex items-center gap-3 transition-colors group-hover:text-[#00F0FF]">
              <span className="text-2xl">🏆</span>
              ARENA MASTERS
            </h3>
          </Link>
          <p className="text-sm text-[#849495] mt-1">
            Top performing strategists in the current XLM Epoch
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block">
              ACTIVE
            </span>
            <span className="font-display text-lg font-bold text-[#00F0FF]">
              {activeUsers.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block">
              PRIZE POOL
            </span>
            <span className="font-display text-lg font-bold text-[#ecb2ff]">
              {formatXLM(totalPool)} XLM
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard rows */}
      <div className="flex flex-col gap-2">
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, i) => (
            <motion.div
              key={`${entry.address}-${entry.rank}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <LeaderboardRow {...entry} isCurrentUser={entry.address === walletAddress} />
            </motion.div>
          ))
        ) : (
          <div className="text-center p-6 text-[#849495] text-sm italic">
            Waiting for arena masters data...
          </div>
        )}
      </div>

      {/* User stats row */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4">
        <div className="glass-panel p-4 text-center">
          <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-2">
            GLOBAL RANK
          </span>
          <span className="font-display text-2xl font-bold text-[#dbfcff]">
            #1,452
          </span>
          <span className="text-[10px] text-[#00F0FF] block mt-1">
            TOP 12% WORLDWIDE
          </span>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-2">
            MY ACCURACY
          </span>
          <span className="font-display text-2xl font-bold text-[#ecb2ff]">
            68.4%
          </span>
          <span className="text-[10px] text-[#00f990] block mt-1">
            +2.4% FROM YESTERDAY
          </span>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-label-mono text-[10px] text-[#849495] tracking-[0.15em] block mb-2">
            TIER STATUS
          </span>
          <span className="font-display text-2xl font-bold text-gradient-primary">
            DIAMOND
          </span>
          <span className="text-[10px] text-[#849495] block mt-1">
            NEXT: CHALLENGER
          </span>
        </div>
      </div>
    </motion.div>
  );
}
