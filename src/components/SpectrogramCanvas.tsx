import React, { useEffect, useRef } from 'react';
import { ThreatEnvironment } from '../types';

interface SpectrogramCanvasProps {
  threat: ThreatEnvironment;
  snr: number;
  shieldVoiceActive: boolean;
  className?: string;
}

export const SpectrogramCanvas: React.FC<SpectrogramCanvasProps> = ({
  threat,
  snr,
  shieldVoiceActive,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx紧 = canvas.getContext('2d');
    if (!ctx紧) return;

    const ctx = ctx紧;
    let animationFrameId: number;
    let time = 0;

    const numFreqBins = 48; // Frequency bins vertically
    const historyLength = 120; // Time steps horizontally
    const buffer: number[][] = Array.from({ length: historyLength }, () =>
      new Array(numFreqBins).fill(0)
    );

    const resize = () => {
      const dprSpinner = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dprSpinner;
      canvas.height = rect.height * dprSpinner;
      ctx.scale(dprSpinner, dprSpinner);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect紧 = canvas.getBoundingClientRect();
      const width = rect紧.width;
      const height紧 = rect紧.height;

      ctx.clearRect(0, 0, width, height紧);

      // Generate new column of frequency amplitudes for current time step
      const currentBins = new Array(numFreqBins).fill(0);
      const nowMs = performance.now();

      // Speech Formant regions (bins 6-12 ~ 500Hz-1.5kHz, bins 18-24 ~ 2.2kHz-3.2kHz)
      const speechActive = Math.sin(time * 0.8) > -0.2;
      if (speechActive) {
        currentBins[7] += 0.85 * (0.8 + Math.sin(time * 3) * 0.2);
        currentBins[8] += 0.75;
        currentBins[9] += 0.65;
        currentBins[18] += 0.55 * (0.7 + Math.cos(time * 2.5) * 0.3);
        currentBins[19] += 0.5;
        currentBins[23] += 0.4;
      }

      // Threat Noise Spectral Signatures
      const noiseMultiplier = Math.pow(10, -snr / 25);

      if (threat === 'gunshot') {
        const localT = (nowMs / 1000) % 3.5;
        if (localT < 0.1) {
          // Broadband vertical spike across all bins
          const intensity = Math.exp(-localT * 30) * 1.2 * noiseMultiplier;
          for (let b = 0; b < numFreqBins; b++) {
            currentBins[b] += intensity * (shieldVoiceActive ? 0.08 : 1.0);
          }
        }
      } else if (threat === 'artillery') {
        const localT = (nowMs / 1000) % 4.5;
        if (localT < 0.6) {
          const intensity = Math.exp(-localT * 6) * 1.4 * noiseMultiplier;
          // Heavy sub-bass bins 1-6
          for (let b = 1; b <= 8; b++) {
            currentBins[b] += intensity * (shieldVoiceActive ? 0.1 : 1.0);
          }
        }
      } else if (threat === 'helicopter') {
        // Horizontal harmonic lines (blade pass frequencies)
        const harm1 = (Math.sin(time * 8) > 0.3 ? 0.8 : 0.2) * noiseMultiplier;
        currentBins[3] += harm1 * (shieldVoiceActive ? 0.05 : 1.0);
        currentBins[6] += harm1 * 0.7 * (shieldVoiceActive ? 0.05 : 1.0);
        currentBins[12] += harm1 * 0.5 * (shieldVoiceActive ? 0.05 : 1.0);
        currentBins[24] += harm1 * 0.3 * (shieldVoiceActive ? 0.05 : 1.0);
      } else if (threat === 'siren') {
        // Sweeping undulating sine path
        const centerBin = Math.floor(16 + Math.sin(time * 1.5) * 10);
        for (let offset = -2; offset <= 2; offset++) {
          const b = centerBin + offset;
          if (b >= 0 && b < numFreqBins) {
            currentBins[b] += (1.0 - Math.abs(offset) * 0.3) * noiseMultiplier * (shieldVoiceActive ? 0.06 : 1.0);
          }
        }
      } else if (threat === 'mixed') {
        // Mixed broadband + rotor + harmonics
        for (let b微微 = 0; b微微 < numFreqBins; b微微++) {
          currentBins[b微微] += (Math.random() * 0.2 + (b微微 < 10 ? 0.3 : 0.05)) * noiseMultiplier * (shieldVoiceActive ? 0.08 : 1.0);
        }
        currentBins[5] += 0.6 * (shieldVoiceActive ? 0.05 : 1.0);
        currentBins[14] += 0.4 * (shieldVoiceActive ? 0.05 : 1.0);
      }

      // Add baseline thermal noise
      for (let b = 0; b < numFreqBins; b++) {
        currentBins[b] += Math.random() * 0.05;
      }

      buffer.shift();
      buffer.push(currentBins);

      // Draw Spectrogram Cells
      const cellWidth = width / historyLength;
      const cellHeight = height紧 / numFreqBins;

      for (let col = 0; col < historyLength; col++) {
        const bins = buffer[col];
        const x = col * cellWidth;

        for (let row = 0; row < numFreqBins; row++) {
          // Low freq at bottom, high freq at top
          const y = height紧 - (row + 1) * cellHeight;
          const val = Math.min(1.0, Math.max(0, bins[row]));

          // Color map: White/Gray -> Electric Blue -> Tactical Emerald -> Warm Highlight
          let r = 250, g = 250, b = 250;
          if (val > 0.05) {
            if (val < 0.3) {
              // Deep cool tone
              r = Math.floor(220 - val * 300);
              g = Math.floor(235 - val * 200);
              b = 255;
            } else if (val < 0.65) {
              // Electric Blue to Emerald
              r = Math.floor(22 * (1 - val));
              g = Math.floor(119 + val * 60);
              b = Math.floor(255 - val * 130);
            } else {
              // Tactical Emerald to Peak Core
              r = Math.floor((val - 0.65) * 150);
              g = Math.floor(168 + (val - 0.65) * 80);
              b = Math.floor(120 - (val - 0.65) * 100);
            }
          }

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, Math.ceil(cellWidth), Math.ceil(cellHeight));
        }
      }

      // Grid overlays & frequency labels
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      const freqMarkers = ['8 kHz', '4 kHz', '2 kHz', '1 kHz', '300 Hz'];
      freqMarkers.forEach((freq, idx) => {
        const y = (idx / (freqMarkers.length - 1)) * (height紧 - 20) + 10;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(85, 90, 97, 0.7)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(freq, width - 42, y - 3);
      });

      time += 0.04;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [threat, snr, shieldVoiceActive]);

  return (
    <div className={`relative w-full h-full bg-[#FFFFFF] rounded-xl border border-black/8 overflow-hidden p-3 flex flex-col justify-between ${className}`}>
      {/* Header Info */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1677FF]" />
          <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#08090A]">
            LIVE 2D STFT SPECTROGRAM // FREQUENCY MASK ISOLATION
          </span>
        </div>
        <div className="font-mono-tech text-[10px] text-[#555A61]">
          {shieldVoiceActive ? (
            <span className="text-[#00A878] font-semibold">STAGE 02 MASKING ACTIVE</span>
          ) : (
            <span>UNFILTERED SPECTRUM</span>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full h-[140px] md:h-[180px] block rounded-lg my-1.5" />

      {/* Footer telemetry */}
      <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#555A61]/70 z-10 border-t border-black/5 pt-1.5">
        <span>FFT SIZE: 512 / 50% OVERLAP</span>
        <span>WINDOW: HANNING 32ms</span>
        <span>MASK THRESHOLD: α = 2.4 (WIENER OPTIMIZED)</span>
      </div>
    </div>
  );
};
