import React, { useState } from 'react';
import { Database, Sliders, Layers, Sparkles, AudioWaveform } from 'lucide-react';

export const DatasetPipelineSection: React.FC = () => {
  const [mixSnr, setMixSnr] = useState<number>(-5);

  return (
    <section className="py-24 bg-[#FAFAFA] border-b border-black/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs mb-4">
            <Database className="w-3.5 h-3.5 text-[#00A878]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              DYNAMIC TRAINING SYNTHESIS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            The model learns from the battlefield.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            ShieldVoice employs an on-the-fly dynamic data synthesizer combining clean multi-accent human speech
            with certified defense acoustic corpuses (AudioSet, MAD datasets) across continuously randomized SNR ranges.
          </p>
        </div>

        {/* Interactive Data Synthesizer Diagram */}
        <div className="bg-white rounded-3xl border border-black/8 p-8 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/6">
            <div className="font-mono-tech text-[11px] font-bold text-[#08090A] uppercase tracking-wider">
              ON-THE-FLY SNR AUGMENTATION PIPELINE
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#555A61]">SYNTHESIZER SNR:</span>
              <span className="font-mono-tech text-xs font-bold text-[#08090A] bg-[#FAFAFA] px-3 py-1 rounded-md border border-black/8">
                {mixSnr > 0 ? `+${mixSnr}.0 dB` : `${mixSnr}.0 dB`}
              </span>
            </div>
          </div>

          {/* 3 Pipeline Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-8">
            {/* Left: Clean Speech Source */}
            <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-black/8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-[#1677FF] font-semibold uppercase">
                  SOURCE A // 10,000+ HOURS
                </span>
                <Sparkles className="w-4 h-4 text-[#1677FF]" />
              </div>
              <h4 className="text-lg font-bold text-[#08090A]">Clean Voice Formants</h4>
              <p className="text-xs text-[#555A61]">
                Multi-accent phonetically balanced military commands and conversational speech recordings.
              </p>
              <div className="h-10 bg-white rounded-lg border border-black/6 flex items-center justify-center font-mono-tech text-[10px] text-[#1677FF]">
                ● CLEAN SIGNAL GENERATOR
              </div>
            </div>

            {/* Middle: Dynamic Mixer Controller */}
            <div className="p-6 bg-[#08090A] text-white rounded-2xl flex flex-col gap-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-[#00A878] font-semibold uppercase">
                  SYNTHESIZER ENGINE
                </span>
                <Sliders className="w-4 h-4 text-[#00A878]" />
              </div>
              <h4 className="text-lg font-bold text-white">Dynamic SNR Mixer</h4>
              <p className="text-xs text-white/70">
                Randomizes signal-to-noise ratio between -15 dB and +15 dB per training batch.
              </p>
              <div>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  value={mixSnr}
                  onChange={(e) => setMixSnr(Number(e.target.value))}
                  className="w-full accent-[#00A878] h-2 bg-white/20 rounded-lg cursor-pointer"
                  aria-label="Synthesizer SNR Slider"
                />
              </div>
            </div>

            {/* Right: Military Noise Source */}
            <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-black/8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-[#00A878] font-semibold uppercase">
                  SOURCE B // DEFENSE CORPUS
                </span>
                <AudioWaveform className="w-4 h-4 text-[#00A878]" />
              </div>
              <h4 className="text-lg font-bold text-[#08090A]">MAD &amp; AudioSet Noise</h4>
              <p className="text-xs text-[#555A61]">
                Artillery detonations, helicopter rotor slaps, small arms gunfire, engine idle, and wind.
              </p>
              <div className="h-10 bg-white rounded-lg border border-black/6 flex items-center justify-center font-mono-tech text-[10px] text-[#00A878]">
                ● NOISE PROFILE INJECTION
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FAFAFA] rounded-xl border border-black/6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555A61] font-mono-tech gap-2">
            <span>AUGMENTATION: PITCH SHIFT ±15% // REVERB SIMULATION // RANDOMLY PHASED</span>
            <span className="text-[#08090A] font-semibold">TOTAL DATASET VOLUME: 45,000+ SAMPLES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
