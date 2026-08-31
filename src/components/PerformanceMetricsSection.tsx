import React from 'react';
import { Activity, Zap, CheckCircle2, Shield, Award } from 'lucide-react';

export const PerformanceMetricsSection: React.FC = () => {
  const metrics = [
    {
      id: 'latency',
      value: '<10 ms',
      numeric: 8.7,
      label: 'End-to-End Latency',
      caption: 'Real-time deterministic edge processing buffer',
      drdoTarget: '15 ms Target',
      drdoNumeric: 15,
      unit: 'ms',
      better: 'lower',
    },
    {
      id: 'snr',
      value: '>20 dB',
      numeric: 22.4,
      label: 'SNR Improvement',
      caption: 'Far exceeds DRDO combat requirement of 15 dB',
      drdoTarget: '15 dB DRDO Baseline',
      drdoNumeric: 15,
      unit: 'dB',
      better: 'higher',
    },
    {
      id: 'stoi',
      value: '~0.94',
      numeric: 0.94,
      label: 'STOI Intelligibility',
      caption: 'Near-perfect speech intelligibility index (0 to 1)',
      drdoTarget: '0.85 DRDO Requirement',
      drdoNumeric: 0.85,
      unit: 'index',
      better: 'higher',
    },
    {
      id: 'pesq',
      value: '~3.5+',
      numeric: 3.58,
      label: 'PESQ Voice Quality',
      caption: 'Clear perceptual speech grade (1.0 to 4.5)',
      drdoTarget: '2.50 DRDO Minimum',
      drdoNumeric: 2.5,
      unit: 'score',
      better: 'higher',
    },
    {
      id: 'footprint',
      value: '<1 MB',
      numeric: 0.84,
      label: 'Model Footprint',
      caption: 'INT8 quantized for microcontrollers & DSPs',
      drdoTarget: '5 MB Budget',
      drdoNumeric: 5,
      unit: 'MB',
      better: 'lower',
    },
  ];

  const benchmarks = [
    { name: 'SNR Improvement (dB)', target: 15, achieved: 22.4, max: 25, unit: 'dB' },
    { name: 'STOI Speech Intelligibility', target: 0.85, achieved: 0.94, max: 1.0, unit: '' },
    { name: 'PESQ Perceptual Quality', target: 2.5, achieved: 3.58, max: 4.5, unit: '' },
    { name: 'Processing Latency (ms - lower is better)', target: 15, achieved: 8.7, max: 20, unit: 'ms', invert: true },
  ];

  return (
    <section id="performance" className="py-24 bg-[#FAFAFA] border-b border-black/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs mb-4">
            <Award className="w-3.5 h-3.5 text-[#00A878]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              RIGOROUS DEFENSE BENCHMARKS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            Built for the edge. <br />
            Measured for the mission.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            Every metric in ShieldVoice is validated against simulated defense testing protocols. The system surpasses
            the DRDO combat standards across acoustic intelligibility, latency budgets, and embedded footprint constraints.
          </p>
        </div>

        {/* 5 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="p-6 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col justify-between hover:border-black/20 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-2">
                  {m.label}
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#08090A] mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-[#555A61] leading-relaxed mb-4">
                  {m.caption}
                </div>
              </div>

              <div className="pt-3 border-t border-black/6 flex items-center justify-between font-mono-tech text-[10px]">
                <span className="text-[#555A61]">TARGET:</span>
                <span className="text-[#00A878] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {m.drdoTarget}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Benchmark Comparison Bars */}
        <div className="bg-white rounded-3xl border border-black/8 p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/6">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61] mb-1">
                STANDARDIZED PERFORMANCE AUDIT
              </div>
              <h3 className="text-xl font-bold text-[#08090A]">
                DRDO Specification Target vs. ShieldVoice Achieved
              </h3>
            </div>
            <div className="flex items-center gap-4 font-mono-tech text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#555A61]/30" />
                <span>DRDO Target</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#00A878]" />
                <span className="font-bold text-[#08090A]">ShieldVoice</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {benchmarks.map((b) => {
              const targetPct = (b.target / b.max) * 100;
              const achievedPct = (b.achieved / b.max) * 100;

              return (
                <div key={b.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium text-[#08090A]">
                    <span>{b.name}</span>
                    <div className="flex gap-4 font-mono-tech text-xs">
                      <span className="text-[#555A61]">Target: {b.target}{b.unit}</span>
                      <span className="text-[#00A878] font-bold">Achieved: {b.achieved}{b.unit}</span>
                    </div>
                  </div>

                  <div className="relative h-6 bg-[#F2F3F5] rounded-lg overflow-hidden flex items-center">
                    {/* DRDO Target Line */}
                    <div
                      className="absolute top-0 bottom-0 bg-[#555A61]/25 rounded-l-lg z-0"
                      style={{ width: `${targetPct}%` }}
                    />
                    {/* ShieldVoice Achieved Bar */}
                    <div
                      className="absolute top-0 bottom-0 bg-[#00A878] rounded-l-lg z-10 transition-all duration-1000"
                      style={{ width: `${achievedPct}%` }}
                    />
                    <div
                      className="absolute z-20 font-mono-tech text-[10px] font-bold text-white pl-2"
                      style={{ left: 0 }}
                    >
                      {b.achieved} {b.unit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
