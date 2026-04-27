'use client';

import { motion } from 'framer-motion';
import ArenaChart from './ArenaChart';
import ArenaOverlay from './ArenaOverlay';

export default function ArenaHero() {
  return (
    <motion.section
      id="arena-hero"
      className="relative w-full h-[600px] overflow-hidden rounded-2xl border border-white/[0.06]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated chart background */}
      <div className="absolute inset-0">
        <ArenaChart />
      </div>

      {/* Overlay with round info */}
      <ArenaOverlay />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#00F0FF]/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#BD00FF]/20 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-[#BD00FF]/20 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#00F0FF]/20 rounded-br-2xl pointer-events-none" />
    </motion.section>
  );
}
