import React, { useState } from 'react';
import { WaveformCanvas } from './WaveformCanvas';
import { ThreatEnvironment } from '../types';
import { Radio, RotateCw, Zap } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [activeNoiseType, setActiveNoiseType] = useState<ThreatEnvironment>('helicopter');

  const noiseCategories = [
    {
      id: 'siren' as ThreatEnvironment,
      number: '01',
      title: 'Stationary & Quasi-Stationary',
      description: 'Continuous thermal hums, vehicle diesel engines, high-speed wind shearing, and persistent drone motor chatter.',
      spectralKey: 'Predictable spectral lines with continuous energy across harmonic bands.',
      icon: Radio,
    },
    {
      id: 'helicopter' as ThreatEnvironment,
      number: '02',
      title: 'Non-Stationary Periodic',
      description: 'Rapidly modulating helicopter rotor blade passes, doppler-shifted tactical sirens, and dynamic mechanical acceleration.',
      spectralKey: 'Dynamic frequency shifts requiring non-linear deep neural frequency masking.',
      icon: RotateCw,
    },
    {
      id: 'gunshot' as ThreatEnvironment,
      number: '03',
      title: 'Impulsive & Shock Waves',
      description: 'Sudden explosive transients from sniper fire, heavy artillery shell discharges, and destructive near-field blast fronts.',
      spectralKey: 'Sub-millisecond peak spikes exceeding ambient energy by >500% that clip neural inputs.',
      icon: Zap,
    },
  ];

  return (
    <section id="technology" className="py-24 bg-[#FAFAFA] border-y border-black/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1677FF]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              ACOUSTIC THREAT CLASSIFICATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            The battlefield doesn't produce clean audio.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            Mission-critical military communication is polluted by three distinct acoustic disturbances.
            Because each distortion follows fundamentally different mathematical physics, a single algorithm cannot
            eliminate all three without catastrophic intelligibility loss.
          </p>
        </div>

        {/* 3 Columns Noise Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {noiseCategories.map((item) => {
            const Icon = item.icon;
            const isSelected = activeNoiseType === item.id;

            return (
              <div
                key={item.number}
                onClick={() => setActiveNoiseType(item.id)}
                className={`p-6 rounded-2xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-2 border-[#08090A] shadow-md -translate-y-1'
                    : 'bg-white/70 border border-black/8 hover:bg-white hover:border-black/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-tech text-xl font-bold text-[#08090A]">
                      {item.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#08090A] text-white'
                          : 'bg-[#F2F3F5] text-[#555A61]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#08090A] mb-3">{item.title}</h3>
                  <p className="text-[14px] text-[#555A61] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/6">
                  <div className="font-mono-tech text-[11px] text-[#08090A]/80 leading-normal">
                    <span className="text-[#1677FF] font-semibold">CHARACTERISTIC: </span>
                    {item.spectralKey}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Acoustic Field Visualizer */}
        <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/6">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61] mb-1">
                INTERACTIVE WAVEFORM INSPECTION
              </div>
              <div className="text-lg font-bold text-[#08090A]">
                Raw Battlefield Signal Profile: {activeNoiseType.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[11px] text-[#555A61]">Select Profile:</span>
              <div className="flex gap-1.5">
                {(['gunshot', 'helicopter', 'siren'] as ThreatEnvironment[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveNoiseType(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-tech uppercase transition-colors cursor-pointer ${
                      activeNoiseType === t
                        ? 'bg-[#08090A] text-white'
                        : 'bg-[#F2F3F5] text-[#555A61] hover:bg-black/8'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WaveformCanvas
              threat={activeNoiseType}
              snr={-6}
              shieldVoiceActive={false}
              type="in"
              label="BATTLEFIELD CAPTURE // UNFILTERED NOISE FIELD"
            />
            <div className="flex flex-col justify-center p-5 bg-[#F2F3F5] rounded-xl border border-black/6">
              <div className="font-mono-tech text-[11px] font-bold text-[#08090A] uppercase tracking-wider mb-2">
                Acoustic Analysis Findings
              </div>
              <ul className="space-y-2 text-[13px] text-[#555A61] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#08090A] font-bold">•</span>
                  <span>
                    Energy dynamic range swings up to <strong className="text-[#08090A]">+38 dB</strong> within 12 ms windows.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#08090A] font-bold">•</span>
                  <span>
                    Spectral overlap covers standard human speech formant fundamentals (120 Hz – 3.4 kHz).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#08090A] font-bold">•</span>
                  <span>
                    Conventional linear filters introduce severe phase distortion and speech clipping.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
