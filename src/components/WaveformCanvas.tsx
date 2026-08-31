import React, { useEffect, useRef } from 'react';
import { ThreatEnvironment } from '../types';
import { computeSignalFrame } from '../utils/audioSimulation';

interface WaveformCanvasProps {
  threat: ThreatEnvironment;
  snr: number;
  shieldVoiceActive: boolean;
  type: 'in' | 'out';
  className?: string;
  label?: string;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  threat,
  snr,
  shieldVoiceActive,
  type,
  className = '',
  label,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let timeOffset = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Waveform Line
      ctx.lineWidth = type === 'out' && shieldVoiceActive ? 2.5 : 1.8;
      ctx.strokeStyle =
        type === 'out'
          ? shieldVoiceActive
            ? '#00A878' // Tactical Emerald when clean
            : '#555A61' // Neutral gray
          : '#1677FF'; // Electric Blue for Input

      ctx.beginPath();

      const pointsCount = 180;
      const nowMs = performance.now();

      for (let i = 0; i < pointsCount; i++) {
        const x = (i / (pointsCount - 1)) * width;
        const normalizedT = timeOffset + (i / pointsCount) * 6.0;

        const { audioIn, audioOut } = computeSignalFrame(
          normalizedT,
          nowMs + i * 15,
          threat,
          snr,
          shieldVoiceActive
        );

        const sample = type === 'in' ? audioIn : audioOut;
        const amplitudeScale = height * 0.28;
        const y = centerY - sample * amplitudeScale;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw subtle glowing fill under waveform
      ctx.lineTo(width, centerY);
      ctx.lineTo(0, centerY);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, centerY - 60, 0, centerY + 60);
      if (type === 'out' && shieldVoiceActive) {
        gradient.addColorStop(0, 'rgba(0, 168, 120, 0.12)');
        gradient.addColorStop(1, 'rgba(0, 168, 120, 0.0)');
      } else if (type === 'in') {
        gradient.addColorStop(0, 'rgba(22, 119, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(22, 119, 255, 0.0)');
      } else {
        gradient.addColorStop(0, 'rgba(85, 90, 97, 0.06)');
        gradient.addColorStop(1, 'rgba(85, 90, 97, 0.0)');
      }
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw active scanner line
      const scanX = ((nowMs * 0.08) % width);
      ctx.strokeStyle = type === 'out' && shieldVoiceActive ? 'rgba(0, 168, 120, 0.4)' : 'rgba(22, 119, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height);
      ctx.stroke();

      timeOffset += 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [threat, snr, shieldVoiceActive, type]);

  return (
    <div className={`relative w-full h-full bg-[#FAFAFA] rounded-xl border border-black/8 overflow-hidden p-3 flex flex-col justify-between ${className}`}>
      {/* Header Info */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              type === 'in'
                ? 'bg-[#1677FF]'
                : shieldVoiceActive
                ? 'bg-[#00A878] animate-pulse'
                : 'bg-[#555A61]'
            }`}
          />
          <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#08090A]">
            {label || (type === 'in' ? 'AUDIO IN // RAW NOISY CHANNEL' : 'AUDIO OUT // RECONSTRUCTED SPEECH')}
          </span>
        </div>
        <div className="font-mono-tech text-[10px] text-[#555A61]">
          {type === 'in' ? (
            <span>RAW SNR: {snr > 0 ? `+${snr}` : snr} dB</span>
          ) : (
            <span className={shieldVoiceActive ? 'text-[#00A878] font-medium' : ''}>
              {shieldVoiceActive ? 'CLEANED // SNR +22.4 dB' : 'DIRECT BYPASS'}
            </span>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full h-[120px] md:h-[150px] block" />

      {/* Footer telemetry */}
      <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#555A61]/70 z-10 border-t border-black/5 pt-1.5">
        <span>SAMPLING: 16 kHz / 16-BIT PCM</span>
        <span>FRAME WINDOW: 20 ms (320 SAMPLES)</span>
        <span>PEAK: {type === 'in' ? '1.82 V' : shieldVoiceActive ? '0.74 V (NORMALIZED)' : '1.82 V'}</span>
      </div>
    </div>
  );
};
