'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HistoryList from '@/components/history/HistoryList';

export default function HistoryPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#BD00FF] animate-pulse" />
              <span className="text-[10px] lg:text-xs font-bold text-[#849495] tracking-[0.3em] uppercase">USER ARCHIVES</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-gradient-primary mb-4">
              Participation History
            </h1>
            <p className="text-[#b9cacb] max-w-2xl text-sm lg:text-lg leading-relaxed">
              Track your performance across all Liquidity Arena rounds. Analyze your prediction accuracy and claim any pending rewards from resolved rounds.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <HistoryList />
        </div>
      </div>
    </main>
  );
}
