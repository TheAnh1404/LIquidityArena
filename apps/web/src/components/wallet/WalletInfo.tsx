'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';
import { shortenAddress } from '@/lib/utils';

export default function WalletInfo() {
  const wallet = useArenaStore((s) => s.wallet);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted || !wallet.connected) return null;

  return (
    <motion.div
      className="glass-panel p-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#BD00FF] flex items-center justify-center text-white font-bold text-sm">
            {wallet.address?.slice(0, 2) || 'GC'}
          </div>
          <div>
            <span className="text-sm font-display font-semibold text-[#dbfcff]">
              {shortenAddress(wallet.address || '')}
            </span>
            <span className="text-xs text-[#849495] block">Stellar Testnet</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-display text-lg font-bold text-[#00F0FF]">{wallet.balance.toLocaleString()}</span>
          <span className="text-xs text-[#849495] block">XLM Balance</span>
        </div>
      </div>
    </motion.div>
  );
}
