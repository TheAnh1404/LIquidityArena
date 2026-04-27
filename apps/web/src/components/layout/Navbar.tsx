'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import WalletConnectButton from '@/components/wallet/WalletConnectButton';

const NAV_ITEMS = [
  { label: 'Arena', href: '/' },
  { label: 'History', href: '/history' },
  { label: 'Leaderboard', href: '/leaderboard' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0d1515]/70 border-b border-white/[0.06]"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#BD00FF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow">
            <span className="text-white font-bold text-sm">LA</span>
          </div>
          <span className="font-display text-lg font-bold text-[#dbfcff] tracking-tight">
            Liquidity Arena
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#00F0FF] bg-[#00F0FF]/8'
                    : 'text-[#849495] hover:text-[#b9cacb] hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Wallet */}
        <WalletConnectButton />
      </div>
    </motion.nav>
  );
}
