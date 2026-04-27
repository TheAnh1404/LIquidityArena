import React from 'react';

interface BadgeProps {
  variant?: 'live' | 'open' | 'status' | 'default';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'default',
  children,
  className = '',
}: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border';
  
  const variants = {
    live: 'tag-live border-transparent',
    open: 'bg-[#00f990]/12 text-[#00f990] border-[#00f990]/30',
    status: 'bg-white/[0.04] text-[#b9cacb] border-white/[0.08]',
    default: 'bg-white/[0.04] text-[#849495] border-white/[0.04]',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-[#00f990] animate-pulse" />}
      {children}
    </span>
  );
}
