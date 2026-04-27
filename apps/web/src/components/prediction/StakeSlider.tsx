'use client';

import { useArenaStore } from '@/lib/store/arenaStore';
import { formatXLM } from '@/lib/utils';

export default function StakeSlider() {
  const stake = useArenaStore((s) => s.stake);
  const setStake = useArenaStore((s) => s.setStake);
  const wallet = useArenaStore((s) => s.wallet);

  const maxStake = wallet.connected ? wallet.balance : 5000;

  const presets = [100, 500, 1000, 2500];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-label-mono text-xs text-[#b9cacb] tracking-[0.15em]">
          STAKE AMOUNT
        </label>
        <span className="text-xs text-[#849495]">
          Max: {formatXLM(maxStake)} XLM
        </span>
      </div>

      {/* Value display */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-display text-3xl font-bold text-[#dbfcff]">
          {formatXLM(stake)}
        </span>
        <span className="text-sm text-[#849495]">XLM</span>
      </div>

      {/* Slider */}
      <input
        id="stake-slider"
        type="range"
        min={10}
        max={maxStake}
        step={10}
        value={stake}
        onChange={(e) => setStake(parseInt(e.target.value))}
        className="arena-slider"
      />

      {/* Percentage indicators */}
      <div className="flex justify-between text-[10px] text-[#849495] -mt-1">
        <span>10 XLM</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>{formatXLM(maxStake)}</span>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 mt-1">
        {presets.map((val) => (
          <button
            key={val}
            onClick={() => setStake(val)}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-medium transition-all ${
              stake === val
                ? 'bg-[#BD00FF]/15 text-[#ecb2ff] border border-[#BD00FF]/30'
                : 'bg-white/[0.03] text-[#849495] border border-white/[0.06] hover:bg-white/[0.06] hover:text-[#b9cacb]'
            }`}
          >
            {formatXLM(val)}
          </button>
        ))}
      </div>
    </div>
  );
}
