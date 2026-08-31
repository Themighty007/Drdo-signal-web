import React, { useState } from 'react';
import { Architecture3D } from './Architecture3D';
import { DualMicrophone3D } from './DualMicrophone3D';
import { Shield, Cpu, Activity, Zap, Layers, Filter } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  // Force WebGL canvas to remount after initial layout paints to ensure sizing is perfect
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderKey(1); 
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    {
      number: '01',
      tag: '01 / IMPULSIVE DEFENSE',
      title: 'Impulsive Noise Gate',
      headline: 'Stop the spike before AI sees it.',
      description:
        'Detects and soft-gates explosive transients such as gunshots, artillery, and blasts before they overwhelm the neural network and cause catastrophic buffer clipping.',
      specs: [
        { label: 'Detection Window', value: '50-Frame Rolling Energy Average' },
        { label: 'Threshold', value: '~5× Ambient Energy' },
        { label: 'Attack Time', value: '<1 ms (Fast Gating)' },
        { label: 'Release Time', value: '50 ms (Smooth Decoupling)' },
      ],
      pipeline: ['Raw Transient Surge', 'Energy Detection', 'Soft Exponential Gate', 'Controlled Normal Output'],
      icon: Zap,
    },
    {
      number: '02',
      tag: '02 / AI SIGNAL SEPARATION',
      title: 'Spectral Gating DNN',
      headline: 'Teach the spectrum what matters.',
      description:
        'AI-driven frequency masking isolates human voice formants from non-stationary noise such as helicopter rotors, diesel vehicles, and Doppler sirens.',
      specs: [
        { label: 'Architecture', value: 'Lightweight Modified DTLN' },
        { label: 'Transform', value: '512-Point STFT with Hanning Window' },
        { label: 'Preservation', value: 'Complex-Phase Preserved' },
        { label: 'Model Size', value: '<1 MB INT8 Quantized' },
      ],
      pipeline: ['Time-Domain Audio', 'STFT Spectrogram', 'Noise Estimation Mask', 'Phase-Preserved Speech'],
      icon: Cpu,
    },
    {
      number: '03',
      tag: '03 / RESIDUAL CANCELLATION',
      title: 'Adaptive NLMS Filter',
      headline: 'Remove what remains.',
      description:
        'A normalized least mean squares (NLMS) adaptive filter utilizes a dedicated outward-facing reference microphone to cancel residual stationary noise in real time.',
      specs: [
        { label: 'Mic Topology', value: 'Dual-Microphone Beamforming' },
        { label: 'Adaptation Step μ', value: 'Dynamic Variable Step-Size' },
        { label: 'Convergence', value: '<15 ms Weight Stabilization' },
        { label: 'Channel Isolation', value: '>24 dB Directivity' },
      ],
      pipeline: ['Primary + Reference Mic', 'Error Signal e(n)', 'Dynamic Weight Update', 'Zero Residual Audio'],
      equation: 'w(n+1) = w(n) + \\mu \\frac{e(n)x(n)}{\\|x(n)\\|^2 + \\epsilon}',
      icon: Filter,
    },
  ];

  return (
    <section id="architecture" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-4">
            <Layers className="w-3.5 h-3.5 text-[#00A878]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              HYBRID DEFENSE ARCHITECTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            Three stages. One clean signal.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            A sequential hybrid architecture combining deterministic DSP with lightweight edge AI to eliminate
            impulsive, non-stationary, and residual noise in sequence.
          </p>
        </div>

        {/* 3D Isometric Architecture Interactive Assembly */}
        <div className="bg-[#FAFAFA] rounded-3xl border border-black/8 p-6 sm:p-8 mb-12 shadow-xs">
          <Architecture3D
            key={renderKey}
            activeStageIndex={selectedStage}
            onSelectStage={(idx) => setSelectedStage(idx)}
          />
        </div>

        {/* Stage Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = selectedStage === idx;

            return (
              <div
                key={st.number}
                onClick={() => setSelectedStage(idx)}
                className={`p-6 sm:p-7 rounded-2xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#08090A] text-white shadow-lg -translate-y-1'
                    : 'bg-[#FAFAFA] text-[#08090A] border border-black/8 hover:bg-[#F2F3F5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono-tech text-[11px] uppercase tracking-wider font-semibold ${
                        isSelected ? 'text-[#00A878]' : 'text-[#555A61]'
                      }`}
                    >
                      {st.tag}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00A878]' : 'text-[#555A61]'}`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{st.title}</h3>
                  <div
                    className={`font-mono-tech text-xs mb-4 italic ${
                      isSelected ? 'text-white/80' : 'text-[#08090A]/75'
                    }`}
                  >
                    "{st.headline}"
                  </div>

                  <p
                    className={`text-[13px] leading-relaxed mb-6 ${
                      isSelected ? 'text-white/70' : 'text-[#555A61]'
                    }`}
                  >
                    {st.description}
                  </p>

                  {/* Specs list */}
                  <div className="space-y-2 mb-6">
                    {st.specs.map((sp) => (
                      <div
                        key={sp.label}
                        className={`flex items-center justify-between text-xs py-1 border-b ${
                          isSelected ? 'border-white/10' : 'border-black/5'
                        }`}
                      >
                        <span className={isSelected ? 'text-white/60' : 'text-[#555A61]'}>
                          {sp.label}
                        </span>
                        <span className={`font-mono-tech font-semibold ${isSelected ? 'text-white' : 'text-[#08090A]'}`}>
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pipeline visual mini-steps */}
                <div
                  className={`pt-4 border-t ${
                    isSelected ? 'border-white/10' : 'border-black/6'
                  }`}
                >
                  <div
                    className={`font-mono-tech text-[10px] uppercase mb-2 ${
                      isSelected ? 'text-[#00A878]' : 'text-[#555A61]'
                    }`}
                  >
                    Pipeline Execution Flow:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {st.pipeline.map((step, pIdx) => (
                      <span
                        key={step}
                        className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-sm ${
                          isSelected
                            ? 'bg-white/10 text-white/90'
                            : 'bg-white text-[#555A61] border border-black/5'
                        }`}
                      >
                        {pIdx + 1}. {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive on Dual-Microphone & NLMS Math */}
        <div className="bg-[#FAFAFA] rounded-2xl border border-black/8 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#00A878] mb-2 font-semibold">
              STAGE 03 HARDWARE INTEGRATION
            </div>
            <h4 className="text-2xl font-bold text-[#08090A] mb-4">
              Dual-Microphone Correlation &amp; Weight Adaptation
            </h4>
            <p className="text-sm text-[#555A61] leading-relaxed mb-6">
              The Primary Microphone points toward the speaker's vocal tract capturing desired speech combined with ambient noise.
              The Reference Microphone faces outward into the acoustic environment to capture an uncorrupted noise reference.
              The NLMS filter computes error updates in sub-millisecond frames to subtract residual stationary energy.
            </p>

            {/* Normalized LMS Equation Display */}
            <div className="bg-white rounded-xl p-4 border border-black/8 shadow-2xs">
              <div className="font-mono-tech text-[10px] text-[#555A61] uppercase tracking-wider mb-1.5">
                NLMS Coefficient Update Formula
              </div>
              <div className="font-mono-tech text-[15px] font-bold text-[#08090A] tracking-wider py-1 text-center bg-[#FAFAFA] rounded-lg border border-black/5">
                w(n+1) = w(n) + μ · [e(n)x(n)] / (||x(n)||² + ε)
              </div>
              <div className="flex justify-between font-mono-tech text-[9px] text-[#555A61]/80 mt-2 px-1">
                <span>μ: Learning Step</span>
                <span>e(n): Residual Error</span>
                <span>x(n): Reference Vector</span>
                <span>ε: Regularization</span>
              </div>
            </div>
          </div>

          <div>
            <DualMicrophone3D shieldVoiceActive={true} />
          </div>
        </div>
      </div>
    </section>
  );
};
