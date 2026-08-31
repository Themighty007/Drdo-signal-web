import React from 'react';
import { ArrowRight, ChevronDown, Activity, Radio, Cpu, ShieldCheck } from 'lucide-react';
import { SignalCore3D } from './SignalCore3D';

interface HeroSectionProps {
  onExploreClick: () => void;
  onInitializeClick: () => void;
  scrollProgress: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onInitializeClick,
  scrollProgress,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-tech-grid"
    >
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-[#00A878]/6 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column: Editorial Statement & CTAs */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 pt-4 lg:pt-0">
          {/* Tactical Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#555A61]">
              DEFENSE INTELLIGENCE // REAL-TIME DSP + AI
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.055em] text-[#08090A] leading-[1.04] mb-6">
            Mission-Critical Clarity. <br className="hidden sm:inline" />
            <span className="text-[#08090A]">Zero Latency.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#555A61] leading-[1.55] max-w-xl mb-8 font-normal">
            ShieldVoice is an adaptive AI/ML noise cancellation engine built for extreme combat
            environments—eliminating artillery, gunshots, and rotor noise in under 10 milliseconds.
          </p>

          {/* Primary CTA + Secondary Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onInitializeClick}
              className="group relative inline-flex items-center justify-center gap-3 bg-[#08090A] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:bg-[#16181B] hover:shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Initialize Prototype</span>
              <ArrowRight className="w-4 h-4 text-[#00A878] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium text-[#08090A] bg-[#FAFAFA] hover:bg-[#F2F3F5] border border-black/8 transition-colors cursor-pointer"
            >
              <span>Explore Architecture</span>
            </button>
          </div>

          {/* Secondary Technical Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-black/8 pt-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#00A878]" />
                <span>EDGE AI</span>
              </div>
              <div className="font-semibold text-[14px] text-[#08090A]">&lt;1 MB MODEL</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>LATENCY</span>
              </div>
              <div className="font-semibold text-[14px] text-[#08090A]">&lt;10 MS</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 text-[#00A878]" />
                <span>INFERENCE</span>
              </div>
              <div className="font-semibold text-[14px] text-[#08090A]">100% OFFLINE</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase text-[#555A61] tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>SNR GAIN</span>
              </div>
              <div className="font-semibold text-[14px] text-[#08090A]">&gt;20 dB</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Acoustic Intelligence Signal Core */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="w-full max-w-[620px] aspect-square relative flex items-center justify-center">
            <SignalCore3D
              scrollProgress={scrollProgress}
              threatType="mixed"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex flex-col items-center justify-center pt-8 z-10">
        <button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-1.5 text-[#555A61] hover:text-[#08090A] transition-colors cursor-pointer group"
        >
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em]">
            EXPLORE THE ARCHITECTURE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#00A878]" />
        </button>
      </div>
    </section>
  );
};
