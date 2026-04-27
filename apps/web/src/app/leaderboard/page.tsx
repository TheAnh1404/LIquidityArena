'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Leaderboard from '@/components/leaderboard/Leaderboard';

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8 lg:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-[10px] lg:text-xs font-bold text-[#849495] tracking-[0.3em] uppercase">GLOBAL STANDINGS</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gradient-primary mb-4">
              Arena Masters
            </h1>
            <p className="text-[#b9cacb] max-w-3xl mx-auto text-sm lg:text-lg leading-relaxed">
              The elite strategists of Liquidity Arena. These traders exhibit the highest precision and profit generation across the XLM network. Compete to join the Diamond tier.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-12">
            <Leaderboard />
            
            {/* Additional info for the full page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="glass-panel p-8">
                    <h4 className="font-display text-2xl font-bold text-[#dbfcff] mb-4 flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF]">✨</span>
                        Reward Tiers
                    </h4>
                    <p className="text-[#b9cacb] mb-6 leading-relaxed">
                        Masters are divided into four tiers based on their monthly performance. Higher tiers receive increased multiplier bonuses and exclusive governance rights.
                    </p>
                    <div className="space-y-4">
                        {[
                            { name: 'Diamond', req: 'Top 1%', bonus: '+15% Multiplier' },
                            { name: 'Platinum', req: 'Top 5%', bonus: '+10% Multiplier' },
                            { name: 'Gold', req: 'Top 15%', bonus: '+5% Multiplier' },
                            { name: 'Silver', req: 'Top 30%', bonus: 'Base Rewards' },
                        ].map((tier) => (
                            <div key={tier.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                <span className="font-bold text-[#dbfcff]">{tier.name}</span>
                                <span className="text-xs text-[#849495] uppercase">{tier.req}</span>
                                <span className="font-display font-bold text-[#00f990]">{tier.bonus}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-8">
                    <h4 className="font-display text-2xl font-bold text-[#dbfcff] mb-4 flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-[#BD00FF]/10 text-[#BD00FF]">🛡️</span>
                        Season Rules
                    </h4>
                    <ul className="space-y-4">
                        {[
                            'Leaderboard resets every 30 days at the end of the Epoch.',
                            'Accuracy is calculated based on price prediction within 0.5% margin.',
                            'Profit is measured in XLM generated through arena pools.',
                            'Collusion or sybil attacks will result in permanent arena ban.',
                        ].map((rule, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#b9cacb]">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#BD00FF] shrink-0" />
                                <span className="text-sm leading-relaxed">{rule}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
