'use client';

import { motion } from 'framer-motion';
import LeaderboardRow from './LeaderboardRow';
import { useArenaStore } from '@/lib/store/arenaStore';
import { formatXLM } from '@/lib/utils';

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    address: 'GC72...45D2',
    title: 'ELITE VOYAGER',
    accuracy: 94.2,
    profit: 12450,
    isCurrentUser: false,
  },
  {
    rank: 2,
    address: 'GD01...99X1',
    title: 'TOP PREDICTOR',
    accuracy: 91.8,
    profit: 8920,
    isCurrentUser: false,
  },
  {
    rank: 3,
    address: '0x99...FF2C',
    title: 'RANK SLIDING',
    accuracy: 88.5,
    profit: 6730,
    isCurrentUser: false,
  },
  {
    rank: 4,
    address: 'WhaleSlayer',
    title: 'RISING STAR',
    accuracy: 84.1,
    profit: 4210,
    isCurrentUser: false,
  },
  {
    rank: 5,
    address: 'GC72MQYK...45D2',
    title: 'ARENA WARRIOR',
    accuracy: 68.4,
    profit: 1240,
    isCurrentUser: true,
  },
  {
    rank: 6,
    address: 'GA89...QRST',
    title: 'NEWCOMER',
    accuracy: 62.0,
    profit: -320,
    isCurrentUser: false,
  },
];

export default function Leaderboard() {
  const totalPool = useArenaStore((s) => s.totalPool);
  const activeUsers = useArenaStore((s) => s.activeUsers);

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
          <h3 className="font-display text-xl font-semibold text-[#dbfcff] flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            ARENA MASTERS
          </h3>
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
        {MOCK_LEADERBOARD.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            <LeaderboardRow {...entry} />
          </motion.div>
        ))}
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
