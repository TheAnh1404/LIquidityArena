'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';

export default function WalletConnectButton() {
  const wallet = useArenaStore((s) => s.wallet);
  const connectWallet = useArenaStore((s) => s.connectWallet);
  const disconnectWallet = useArenaStore((s) => s.disconnectWallet);

  return (
    <AnimatePresence mode="wait">
      {!wallet.connected ? (
        <motion.button
          key="connect"
          onClick={connectWallet}
          className="btn-secondary flex items-center gap-2 text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse-dot" />
          Connect Wallet
        </motion.button>
      ) : (
        <motion.button
          key="connected"
          onClick={disconnectWallet}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00f990]" />
          <div className="text-left">
            <span className="text-xs font-display font-semibold text-[#dbfcff] block">
              {wallet.address}
            </span>
            <span className="text-[10px] text-[#849495]">
              {wallet.balance.toLocaleString()} XLM
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
