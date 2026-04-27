'use client';

import { motion } from 'framer-motion';
import ActivityItem from './ActivityItem';
import { useArenaStore } from '@/lib/store/arenaStore';

const MOCK_ACTIVITIES = [
  {
    type: 'whale' as const,
    title: 'WHALE ALERT',
    description: 'Whale entered arena with 500,000 XLM',
    time: '2m ago',
    amount: 'STAKE: 500,000 XLM',
  },
  {
    type: 'prediction' as const,
    title: 'PREDICTION',
    description: '0x123...4a predicted 0.145',
    time: '3m ago',
    amount: 'STAKE: 1,200 XLM',
  },
  {
    type: 'close' as const,
    title: 'POSITION CLOSED',
    description: 'VaultMaster hit prediction +12.4%',
    time: '4m ago',
    amount: '+2,480 XLM',
  },
  {
    type: 'join' as const,
    title: 'JOINED',
    description: 'GC...f2 joined XLM/USDT arena',
    time: '5m ago',
  },
  {
    type: 'prediction' as const,
    title: 'PREDICTION',
    description: '0x99...bb predicted 0.142',
    time: '6m ago',
    amount: 'STAKE: 800 XLM',
  },
  {
    type: 'whale' as const,
    title: 'WHALE ALERT',
    description: 'Large liquidity position closed at 0.144',
    time: '8m ago',
    amount: '1.2M XLM',
  },
  {
    type: 'join' as const,
    title: 'JOINED',
    description: 'StellarNova entered Round #402',
    time: '10m ago',
  },
  {
    type: 'prediction' as const,
    title: 'PREDICTION',
    description: 'CryptoViper predicted 0.1435',
    time: '12m ago',
    amount: 'STAKE: 3,500 XLM',
  },
];

export default function ActivityFeed() {
  const recentActivities = useArenaStore((s) => s.recentActivities);

  const activities = [
    ...recentActivities.map((a) => ({
      type: (a.stakeAmount > 10000 ? 'whale' : 'prediction') as 'whale' | 'prediction',
      title: a.stakeAmount > 10000 ? 'WHALE ALERT' : 'PREDICTION',
      description: `${a.userAddress.slice(0, 4)}...${a.userAddress.slice(-4)} predicted ${a.predictedPrice}`,
      time: 'Just now',
      amount: `STAKE: ${a.stakeAmount.toLocaleString()} XLM`,
    })),
    ...MOCK_ACTIVITIES,
  ].slice(0, 20);

  return (
    <motion.div
      id="activity-feed"
      className="glass-panel p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-[#dbfcff] flex items-center gap-2">
          <span className="text-xl">📡</span>
          LIVE BATTLE FEED
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f990] animate-pulse-dot" />
          <span className="text-xs text-[#00f990]">LIVE</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { label: 'Live Feed', icon: '📡', active: true },
          { label: 'Whale Alerts', icon: '🐋', active: false },
          { label: 'Predictions', icon: '📊', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab.active
                ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20'
                : 'text-[#849495] border border-white/[0.04] hover:bg-white/[0.04]'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity items */}
      <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-1">
        {activities.map((activity, i) => (
          <ActivityItem key={i} {...activity} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
