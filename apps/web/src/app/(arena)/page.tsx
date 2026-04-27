'use client';

import { useEffect, useState } from 'react';
import ArenaHero from '@/components/arena/ArenaHero';
import PredictionPanel from '@/components/prediction/PredictionPanel';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import ActivityFeed from '@/components/activity/ActivityFeed';
import MyStrategyPanel from '@/components/strategy/MyStrategyPanel';
import WalletInfo from '@/components/wallet/WalletInfo';
import { useArenaStore } from '@/lib/store/arenaStore';

export default function ArenaPage() {
  const initSocket = useArenaStore((s) => s.initSocket);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    initSocket();
    return () => clearTimeout(timeout);
  }, [initSocket]);

  if (!mounted) return <div className="min-h-screen bg-[#0d1515]" />;

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-8">
      {/* Row 1: Hero + Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
        <ArenaHero />
        <div className="flex flex-col gap-6">
          <WalletInfo />
          <PredictionPanel />
        </div>
      </div>

      {/* Row 2: Leaderboard + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
        <Leaderboard />
        <ActivityFeed />
      </div>

      {/* Row 3: Strategy */}
      <MyStrategyPanel />

      {/* Footer accent */}
      <footer className="text-center py-8 border-t border-white/[0.04]">
        <p className="text-xs text-[#849495]">
          Liquidity Arena — Powered by{' '}
          <span className="text-[#00F0FF]">Stellar Network</span>
        </p>
      </footer>
    </div>
  );
}
