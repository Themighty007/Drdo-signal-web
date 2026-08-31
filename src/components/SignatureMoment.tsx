import React, { useState } from 'react';
import { ShieldCheck, Play, RotateCcw, CheckCircle2, Cpu } from 'lucide-react';

export const SignatureMoment: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Chaotic Acoustic Spike', desc: 'Explosive combat transient surges into input buffer', progress: 20 },
    { title: 'Stage 01: Impulsive Soft-Gate', desc: 'Detects 5x energy threshold & clamps spike in <1ms', progress: 45 },
    { title: 'Stage 02: Spectral Gating DNN', desc: 'Separates human voice formants from rotor noise', progress: 70 },
    { title: 'Stage 03: Adaptive NLMS Filter', desc: 'Reference mic channel cancels residual hum in real-time', progress: 90 },
    { title: 'Clean Speech Stabilized', desc: 'Zero latency output delivered with >20 dB SNR improvement', progress: 100 },
  ];

  const handleTrigger = () => {
    setPhase('running');
    setCurrentStep(0);

    const stepIntervals = [0, 600, 1300, 2000, 2700];

    stepIntervals.forEach((time, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        if (index === stepIntervals.length - 1) {
          setPhase('completed');
        }
      }, time);
    });
  };

  const handleReset = () => {
    setPhase('idle');
    setCurrentStep(0);
  };

  return (
    <section className="py-20 bg-[#FFFFFF] border-y border-black/8 relative overflow-hidden">
      {/* Background soft emerald glow during completion */}
      <div
        className={`absolute inset-0 bg-radial from-[#00A878]/8 via-transparent to-transparent transition-opacity duration-700 pointer-events-none ${
          phase === 'completed' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-[#08090A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Top header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00A878] mb-1">
                SIGNATURE INTERACTIVE PROOF // REAL-TIME TRANSFORMATION
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
                From Chaos to Mission-Critical Clarity
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {phase !== 'running' ? (
                <button
                  onClick={handleTrigger}
                  className="inline-flex items-center gap-2 bg-[#00A878] hover:bg-[#009268] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 cursor-pointer shadow-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Sequence</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 font-mono-tech text-xs text-[#00A878] bg-white/10 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#00A878] animate-ping" />
                  <span>PROCESSING SEQUENCE...</span>
                </div>
              )}

              {phase === 'completed' && (
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Timeline bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-linear-to-r from-[#1677FF] via-[#00A878] to-[#00A878] transition-all duration-500 ease-out"
              style={{
                width: phase === 'idle' ? '0%' : `${steps[currentStep]?.progress || 0}%`,
              }}
            />
          </div>

          {/* Dynamic Status Display */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {steps.map((step, idx) => {
              const isPast = phase === 'completed' || (phase === 'running' && currentStep >= idx);
              const isCurrent = phase === 'running' && currentStep === idx;

              return (
                <div
                  key={step.title}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white/15 border-[#00A878] scale-102 shadow-sm'
                      : isPast
                      ? 'bg-white/5 border-white/20 text-white'
                      : 'bg-transparent border-white/5 text-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tech text-[10px] text-[#00A878]">
                      0{idx + 1}
                    </span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878]" />}
                  </div>
                  <div className="font-bold text-[13px] mb-1 leading-snug">{step.title}</div>
                  <div className="text-[11px] text-white/70 leading-normal">{step.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Big Signature Reveal Banner */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00A878]/20 border border-[#00A878]/30 flex items-center justify-center text-[#00A878]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#00A878]">
                  {phase === 'completed' ? 'RESULT: SIGNAL CERTIFIED' : 'CORE TENET'}
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Mission-Critical Clarity. Zero Latency.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono-tech text-xs text-white/80">
              <div>
                <div className="text-[10px] text-white/50">MEASURED LATENCY</div>
                <div className="text-base font-bold text-[#00A878]">8.7 ms</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-white/50">STOI INTELLIGIBILITY</div>
                <div className="text-base font-bold text-[#00A878]">0.94</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-white/50">SYSTEM FOOTPRINT</div>
                <div className="text-base font-bold text-white">&lt;1 MB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
