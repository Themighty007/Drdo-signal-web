import React from 'react';
import { AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

export const TraditionalFailureSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-[#555A61]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              CONVENTIONAL DSP LIMITATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            One filter cannot solve three problems.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            Legacy military radios rely on single-mode filtering (such as spectral subtraction or single-channel LMS).
            When subjected to multi-threat combat audio, these algorithms introduce destructive artifacts, phase jitter,
            and complete voice dropout.
          </p>
        </div>

        {/* Failure Pipeline Comparison Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/8 flex flex-col justify-between">
            <div>
              <div className="font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-2">
                STAGE 01 // INPUT
              </div>
              <div className="text-xl font-bold text-[#08090A] mb-3">Raw Combat Audio</div>
              <p className="text-[13px] text-[#555A61] leading-relaxed mb-4">
                Speech buried under gunshots, rotor blade chop, and heavy vehicle engine roar.
              </p>
            </div>
            <div className="h-16 bg-white rounded-lg border border-black/6 flex items-center justify-center font-mono-tech text-[11px] text-[#555A61]">
              SNR: -8.0 dB (Extreme Distortion)
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/8 flex flex-col justify-between relative">
            <div>
              <div className="font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-2">
                STAGE 02 // LEGACY FILTER
              </div>
              <div className="text-xl font-bold text-[#08090A] mb-3">Single-Stage Filter</div>
              <p className="text-[13px] text-[#555A61] leading-relaxed mb-4">
                Static noise gate or classical LMS filter attempts universal suppression.
              </p>
            </div>
            <div className="h-16 bg-white rounded-lg border border-black/6 flex items-center justify-center font-mono-tech text-[11px] text-[#08090A]">
              Filter Overload &amp; Weight Collapse
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-black/[0.02] border border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono-tech text-[10px] uppercase text-red-600 font-semibold tracking-wider">
                  FAILURE OUTCOME
                </div>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-xl font-bold text-[#08090A] mb-3">Distorted Speech</div>
              <p className="text-[13px] text-[#555A61] leading-relaxed mb-4">
                Musical noise artifacts, clipped consonants, muffled phonemes, and intelligibility loss.
              </p>
            </div>
            <div className="h-16 bg-white rounded-lg border border-red-500/20 flex items-center justify-center font-mono-tech text-[11px] text-red-600 font-medium">
              STOI: 0.58 // Critical Failure
            </div>
          </div>
        </div>

        {/* Transition callout */}
        <div className="p-8 rounded-2xl bg-[#08090A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#00A878] mb-1">
              THE SHIELDVOICE ARCHITECTURAL PARADIGM
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">
              So we don't use one filter. We use three.
            </div>
          </div>
          <div className="font-mono-tech text-xs text-white/70 max-w-sm text-right md:text-left">
            Deterministic DSP gating + Deep Neural spectral isolation + Real-time adaptive NLMS residual cancellation.
          </div>
        </div>
      </div>
    </section>
  );
};
