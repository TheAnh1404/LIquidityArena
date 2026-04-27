'use client';

import { motion } from 'framer-motion';
import PriceInput from './PriceInput';
import StakeSlider from './StakeSlider';
import MultiplierDisplay from './MultiplierDisplay';
import EnterArenaButton from './EnterArenaButton';

export default function PredictionPanel() {
  return (
    <motion.div
      id="prediction-panel"
      className="glass-panel-glow p-6 flex flex-col gap-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="font-display text-xl font-semibold text-[#dbfcff]">
            Make Your Prediction
          </h3>
          <p className="text-sm text-[#849495] mt-1">XLM closing price prediction</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f990] animate-pulse-dot" />
          <span className="text-xs text-[#00f990] font-medium">OPEN</span>
        </div>
      </div>

      {/* Price Input */}
      <PriceInput />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Stake Slider */}
      <StakeSlider />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Multiplier */}
      <MultiplierDisplay />

      {/* Enter Button */}
      <EnterArenaButton />

      {/* Disclaimer */}
      <p className="text-[10px] text-[#849495]/60 text-center leading-relaxed">
        By entering the arena, you agree to the prediction rules. Funds are locked
        until round completion.
      </p>
    </motion.div>
  );
}
