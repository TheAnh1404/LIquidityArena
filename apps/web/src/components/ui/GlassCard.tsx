'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'high' | 'glow';
  children: React.ReactNode;
}

export default function GlassCard({
  variant = 'default',
  children,
  className = '',
  ...props
}: GlassCardProps) {
  const baseStyle = 'rounded-2xl transition-all duration-300';
  const variants = {
    default: 'glass-panel',
    high: 'glass-panel-high',
    glow: 'glass-panel-glow',
  };

  return (
    <motion.div
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
