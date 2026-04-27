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
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Charts & Arena Hero (8 columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-1">
          <ArenaHero />
          <div className="hidden lg:block">
            <PredictionPanel />
          </div>
        </div>

        {/* Right: Stats & User Strategy (4 columns on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-2">
          <WalletInfo />
          <MyStrategyPanel />
          
          {/* Mobile-only Prediction Panel (Shown at bottom for easier reach) */}
          <div className="lg:hidden">
            <PredictionPanel />
          </div>
          
          <Leaderboard />
          <ActivityFeed />
        </div>
      </div>

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
