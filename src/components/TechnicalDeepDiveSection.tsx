import React, { useState } from 'react';
import { ChevronDown, Code, FileText, Cpu, Filter, Zap } from 'lucide-react';

export const TechnicalDeepDiveSection: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const modules = [
    {
      id: 0,
      title: 'Impulsive Noise Gate Algorithm',
      subtitle: 'Deterministic Pre-Processing & Transient Suppression',
      icon: Zap,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#555A61] leading-relaxed">
          <p>
            The impulsive gate constantly evaluates a rolling 50-frame root-mean-square (RMS) energy buffer.
            When instantaneous frame energy Ef exceeds the ambient threshold λ ≈ 5 × E_avg,
            the soft-gain attenuator triggers with an attack time under 1 millisecond.
          </p>
          <div className="bg-[#08090A] text-white p-4 rounded-xl font-mono-tech text-xs overflow-x-auto">
            {`// Soft-gate exponential suppression
if (frameEnergy > 5.0 * ambientEnergy) {
  gain = Math.exp(-attackRate * dt); // <1ms clamp
} else {
  gain = gain + (1.0 - gain) * releaseRate; // 50ms smooth release
}
outputSignal = inputSignal * gain;`}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech text-[11px] pt-2">
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Attack: &lt;1.0 ms</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Release: 50.0 ms</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Window: 50 Frames</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">DSP Latency: 0.2 ms</div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Spectral Gating DNN (Modified DTLN)',
      subtitle: 'Dual-Path Time-Frequency Neural Isolation',
      icon: Cpu,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#555A61] leading-relaxed">
          <p>
            The neural core leverages a 512-point Short-Time Fourier Transform (STFT) with 50% overlap.
            A dual-path recurrent network predicts a real-valued ideal ratio mask (IRM) in the frequency domain,
            which is applied directly to the magnitude spectrum while maintaining complex-phase fidelity.
          </p>
          <div className="bg-[#08090A] text-white p-4 rounded-xl font-mono-tech text-xs overflow-x-auto">
            {`// Spectral Wiener-style ratio masking
X(f, t) = STFT(audioSignal);
M(f, t) = DNN_Mask_Estimator(|X(f, t)|);
S_clean(f, t) = X(f, t) * M(f, t); // Phase preserved
cleanAudio = iSTFT(S_clean(f, t));`}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech text-[11px] pt-2">
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">STFT Size: 512</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Hanning Window: 32 ms</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Params: 840k (INT8)</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Inference: 4.8 ms</div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Adaptive NLMS Filter & Dual Microphones',
      subtitle: 'Real-Time Weight Convergence & Residual Cancellation',
      icon: Filter,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#555A61] leading-relaxed">
          <p>
            Using a secondary reference channel uncorrupted by speech, the Normalized Least Mean Squares (NLMS) filter
            dynamically models the acoustic transfer function between the ambient noise source and the primary microphone.
          </p>
          <div className="bg-[#08090A] text-white p-4 rounded-xl font-mono-tech text-xs overflow-x-auto">
            {`// Normalized LMS adaptive filter loop
e(n) = d(n) - w^T(n) * x(n); // Error signal
w(n+1) = w(n) + (mu / (norm_sq(x(n)) + epsilon)) * e(n) * x(n);
cleanSpeech = e(n); // Speech recovered at error port`}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech text-[11px] pt-2">
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Filter Order: N = 64</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Step-size μ: 0.05</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Convergence: &lt;15 ms</div>
            <div className="p-2 bg-[#FAFAFA] rounded-md border border-black/5">Isolation: &gt;24 dB</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-4">
            <FileText className="w-3.5 h-3.5 text-[#1677FF]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              UNDER THE SIGNAL // MATHEMATICAL FOUNDATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            Under the signal.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            Detailed engineering specifications, pseudo-code routines, and mathematical convergence proofs for each stage in the pipeline.
          </p>
        </div>

        {/* Expandable Accordions */}
        <div className="space-y-4">
          {modules.map((m) => {
            const isOpen = openSection === m.id;
            const Icon = m.icon;

            return (
              <div
                key={m.id}
                className="bg-[#FAFAFA] rounded-2xl border border-black/8 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : m.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#08090A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#08090A]">{m.title}</h3>
                      <div className="font-mono-tech text-xs text-[#555A61]">{m.subtitle}</div>
                    </div>
                  </div>

                  <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-[#555A61]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-black/6 bg-white">
                    {m.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
