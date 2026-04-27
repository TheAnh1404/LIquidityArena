'use client';

import { useArenaStore } from '@/lib/store/arenaStore';

export default function PriceInput() {
  const price = useArenaStore((s) => s.price);
  const setPrice = useArenaStore((s) => s.setPrice);
  const currentXlmPrice = useArenaStore((s) => s.currentXlmPrice);

  const quickValues = [
    currentXlmPrice - 0.0020,
    currentXlmPrice,
    currentXlmPrice + 0.0020,
    currentXlmPrice + 0.0040,
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-label-mono text-xs text-[#b9cacb] tracking-[0.15em]">
          YOUR PREDICTION
        </label>
        <span className="text-xs text-[#849495]">Current: ${currentXlmPrice.toFixed(4)}</span>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00F0FF] font-display font-semibold text-lg">
          $
        </span>
        <input
          id="price-input"
          type="number"
          step="0.0001"
          min="0.0001"
          max="1"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          className="arena-input pl-10 pr-4 text-right"
          placeholder={currentXlmPrice.toFixed(4)}
        />
      </div>
      {/* Quick prediction buttons */}
      <div className="flex gap-2">
        {quickValues.map((val) => (
          <button
            key={val}
            onClick={() => setPrice(val)}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-medium transition-all ${
              Math.abs(price - val) < 0.00001
                ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                : 'bg-white/[0.03] text-[#849495] border border-white/[0.06] hover:bg-white/[0.06] hover:text-[#b9cacb]'
            }`}
          >
            ${val.toFixed(4)}
          </button>
        ))}
      </div>
    </div>
  );
}
