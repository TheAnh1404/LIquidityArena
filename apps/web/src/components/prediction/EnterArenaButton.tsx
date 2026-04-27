'use client';

import { motion } from 'framer-motion';
import { useArenaStore } from '@/lib/store/arenaStore';

export default function EnterArenaButton() {
  const enterArena = useArenaStore((s) => s.enterArena);
  const isEntering = useArenaStore((s) => s.isEntering);
  const wallet = useArenaStore((s) => s.wallet);

  return (
    <motion.button
      id="enter-arena-btn"
      onClick={enterArena}
      disabled={isEntering}
      className={`btn-primary w-full py-5 text-lg relative overflow-hidden ${
        isEntering ? 'opacity-80' : ''
      }`}
      whileHover={wallet.connected && !isEntering ? { scale: 1.02 } : {}}
      whileTap={wallet.connected && !isEntering ? { scale: 0.98 } : {}}
    >
      {/* Shimmer animation */}
      {isEntering && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {isEntering ? (
          <>
            <motion.span
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            ENTERING ARENA...
          </>
        ) : !wallet.connected ? (
          'CONNECT WALLET FIRST'
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white"
            >
              <path
                d="M10 2L18 10L10 18M2 10H18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ENTER THE ARENA
          </>
        )}
      </span>
    </motion.button>
  );
}
