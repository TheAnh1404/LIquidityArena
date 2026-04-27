import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function ArenaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
}
