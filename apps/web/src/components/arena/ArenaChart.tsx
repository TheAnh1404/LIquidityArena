'use client';

import { useEffect, useRef } from 'react';
import { useArenaStore } from '@/lib/store/arenaStore';

const CHART_POINTS = 80;
const BASE_PRICE = 0.143;

function generateChartData(): number[] {
  const data: number[] = [];
  let price = BASE_PRICE;
  for (let i = 0; i < CHART_POINTS; i++) {
    price += (Math.random() - 0.48) * 0.001;
    price = Math.max(BASE_PRICE - 0.005, Math.min(BASE_PRICE + 0.005, price));
    data.push(price);
  }
  return data;
}

export default function ArenaChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(generateChartData());
  const animationRef = useRef<number>(0);
  const currentXlmPrice = useArenaStore((s) => s.currentXlmPrice);

  // Sync last point with real-time price
  useEffect(() => {
    if (dataRef.current.length > 0) {
      dataRef.current[dataRef.current.length - 1] = currentXlmPrice;
    }
  }, [currentXlmPrice]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let frame = 0;

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Shift data
      if (frame % 3 === 0) {
        const last = dataRef.current[dataRef.current.length - 1];
        const newPrice = last + (Math.random() - 0.48) * 0.0008;
        dataRef.current.push(
          Math.max(BASE_PRICE - 0.005, Math.min(BASE_PRICE + 0.005, newPrice))
        );
        if (dataRef.current.length > CHART_POINTS) {
          dataRef.current.shift();
        }
      }

      const data = dataRef.current;
      const min = Math.min(...data) - 0.001;
      const max = Math.max(...data) + 0.001;
      const range = max - min;

      const stepX = w / (data.length - 1);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(59, 73, 75, 0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const y = (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Build path
      const points: [number, number][] = data.map((d, i) => [
        i * stepX,
        h - ((d - min) / range) * h * 0.85 - h * 0.075,
      ]);

      // Gradient fill under curve
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(189, 0, 255, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const cx = (points[i - 1][0] + points[i][0]) / 2;
        ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], cx, (points[i - 1][1] + points[i][1]) / 2);
      }
      ctx.quadraticCurveTo(
        points[points.length - 1][0],
        points[points.length - 1][1],
        points[points.length - 1][0],
        points[points.length - 1][1]
      );
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Main line
      const lineGradient = ctx.createLinearGradient(0, 0, w, 0);
      lineGradient.addColorStop(0, '#00F0FF');
      lineGradient.addColorStop(0.5, '#BD00FF');
      lineGradient.addColorStop(1, '#00F0FF');

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const cx = (points[i - 1][0] + points[i][0]) / 2;
        ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], cx, (points[i - 1][1] + points[i][1]) / 2);
      }
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Glow line (wider, more transparent)
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const cx = (points[i - 1][0] + points[i][0]) / 2;
        ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], cx, (points[i - 1][1] + points[i][1]) / 2);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Current price dot
      const lastPoint = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(lastPoint[0], lastPoint[1], 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();

      // Dot glow
      ctx.beginPath();
      ctx.arc(lastPoint[0], lastPoint[1], 12 + Math.sin(frame * 0.05) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.fill();

      // Price label
      const currentPrice = data[data.length - 1].toFixed(4);
      ctx.fillStyle = '#00F0FF';
      ctx.font = '600 13px "Space Grotesk", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`$${currentPrice}`, lastPoint[0] - 18, lastPoint[1] - 12);

      frame++;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Vignette overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d1515] via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0d1515] via-transparent to-transparent opacity-30" />
    </div>
  );
}
