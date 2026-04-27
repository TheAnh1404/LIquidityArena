/**
 * Format a number as a compact currency value
 */
export function formatXLM(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}K`;
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * Format a price with precision
 */
export function formatPrice(value: number, digits: number = 4): string {
  return value.toFixed(digits);
}

/**
 * Shorten a Stellar address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Get status color classes
 */
export function getStatusColor(status: string): {
  text: string;
  bg: string;
  border: string;
  glow: string;
} {
  switch (status) {
    case 'leading':
      return {
        text: 'text-[#00f990]',
        bg: 'bg-[#00f990]/10',
        border: 'border-[#00f990]/30',
        glow: 'shadow-[0_0_15px_rgba(0,249,144,0.3)]',
      };
    case 'risky':
      return {
        text: 'text-[#FFD700]',
        bg: 'bg-[#FFD700]/10',
        border: 'border-[#FFD700]/30',
        glow: 'shadow-[0_0_15px_rgba(255,215,0,0.3)]',
      };
    case 'losing':
      return {
        text: 'text-[#FF4B2B]',
        bg: 'bg-[#FF4B2B]/10',
        border: 'border-[#FF4B2B]/30',
        glow: 'shadow-[0_0_15px_rgba(255,75,43,0.3)]',
      };
    default:
      return {
        text: 'text-[#b9cacb]',
        bg: 'bg-[#b9cacb]/10',
        border: 'border-[#b9cacb]/30',
        glow: '',
      };
  }
}

/**
 * Format time remaining from a future timestamp
 */
export function formatTimeRemaining(endTime: number): {
  hours: string;
  minutes: string;
  seconds: string;
  total: number;
} {
  const now = Date.now();
  const diff = Math.max(0, endTime - now);
  const totalSeconds = Math.floor(diff / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    total: totalSeconds,
  };
}
