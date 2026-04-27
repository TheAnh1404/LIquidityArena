import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import NotificationSystem from '@/components/ui/NotificationSystem';

export const metadata: Metadata = {
  title: "Liquidity Arena — XLM Prediction Market",
  description:
    "A real-time prediction market for XLM (Stellar Lumens). Enter the arena, predict prices, and compete with traders worldwide.",
  keywords: ["XLM", "Stellar", "prediction market", "crypto", "DeFi", "Web3"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0d1515] text-[#dce4e5]">
        <Navbar />
        {children}
        <NotificationSystem />
      </body>
    </html>
  );
}
