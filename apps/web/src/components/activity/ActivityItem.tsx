'use client';

import { motion } from 'framer-motion';

interface ActivityItemProps {
  type: 'whale' | 'prediction' | 'join' | 'close';
  title: string;
  description: string;
  time: string;
  amount?: string;
  index: number;
}

export default function ActivityItem({
  type,
  title,
  description,
  time,
  amount,
  index,
}: ActivityItemProps) {
  const typeStyles: Record<string, { icon: string; color: string; bg: string }> = {
    whale: {
      icon: '🐋',
      color: 'text-[#FFD700]',
      bg: 'bg-[#FFD700]/8',
    },
    prediction: {
      icon: '📊',
      color: 'text-[#00F0FF]',
      bg: 'bg-[#00F0FF]/8',
    },
    join: {
      icon: '⚔️',
      color: 'text-[#ecb2ff]',
      bg: 'bg-[#ecb2ff]/8',
    },
    close: {
      icon: '✅',
      color: 'text-[#00f990]',
      bg: 'bg-[#00f990]/8',
    },
  };

  const style = typeStyles[type] || typeStyles.prediction;

  return (
    <motion.div
      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center text-base flex-shrink-0`}
      >
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${style.color} uppercase tracking-wider`}>
            {title}
          </span>
          <span className="text-[10px] text-[#849495]">• {time}</span>
        </div>
        <p className="text-sm text-[#b9cacb] mt-0.5 truncate">{description}</p>
        {amount && (
          <span className="text-xs font-display font-semibold text-[#00F0FF] mt-1 inline-block">
            {amount}
          </span>
        )}
      </div>
    </motion.div>
  );
}
