'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityItem from './ActivityItem';
import { useArenaStore } from '@/lib/store/arenaStore';

// Using dynamic data from backend instead of mock data

export default function ActivityFeed() {
  const recentActivities = useArenaStore((s) => s.recentActivities);
  const [activeFilter, setActiveFilter] = useState<'all' | 'whale' | 'prediction'>('all');

  const allActivities = recentActivities.map((a) => ({
    type: (a.stakeAmount > 10000 ? 'whale' : 'prediction') as 'whale' | 'prediction',
    title: a.stakeAmount > 10000 ? 'WHALE ALERT' : 'PREDICTION',
    description: `${a.userAddress.slice(0, 4)}...${a.userAddress.slice(-4)} predicted $${a.predictedPrice.toFixed(4)}`,
    time: 'Just now',
    amount: `STAKE: ${a.stakeAmount.toLocaleString()} XLM`,
  }));

  const filteredActivities = allActivities.filter((activity) => {
    if (activeFilter === 'all') return true;
    return activity.type === activeFilter;
  });

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
          { id: 'all', label: 'Live Feed', icon: '📡' },
          { id: 'whale', label: 'Whale Alerts', icon: '🐋' },
          { id: 'prediction', label: 'Predictions', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === tab.id
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
        <AnimatePresence mode="popLayout">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, i) => (
              <motion.div
                key={`${activity.type}-${i}-${activity.amount}`}
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ActivityItem {...activity} index={i} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center p-6 text-[#849495] text-sm italic"
            >
              No {activeFilter === 'whale' ? 'whale alerts' : 'predictions'} found yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
