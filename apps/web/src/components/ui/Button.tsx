'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyle = 'relative overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'text-[#849495] hover:text-[#b9cacb] hover:bg-white/[0.04] px-4 py-2 rounded-lg',
  };

  return (
    <motion.button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
