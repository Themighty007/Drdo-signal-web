import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalStatementSectionProps {
  onInitializeClick: () => void;
  onExploreClick: () => void;
}

export const FinalStatementSection: React.FC<FinalStatementSectionProps> = ({
  onInitializeClick,
  onExploreClick,
}) => {
  return (
    <section className="py-32 bg-[#FFFFFF] relative overflow-hidden text-center">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center">
        {/* Subtle Brand Marker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-8">
          <ShieldCheck className="w-4 h-4 text-[#00A878]" />
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#555A61]">
            SHIELDVOICE // THE SIGNAL PROMISE
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.055em] text-[#08090A] leading-[1.06] mb-6 max-w-4xl">
          Hear what matters. <br />
          <span className="text-[#555A61]">Ignore what doesn't.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#555A61] max-w-2xl mb-12 font-normal leading-relaxed">
          When life-saving communication hangs on the next millisecond, noise cancellation isn't a feature—it's a tactical imperative.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onInitializeClick}
            className="group relative inline-flex items-center justify-center gap-3 bg-[#08090A] text-white px-8 py-4 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:bg-[#16181B] hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <span>Initialize Prototype</span>
            <ArrowRight className="w-4 h-4 text-[#00A878] transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[14px] font-medium text-[#08090A] bg-[#FAFAFA] hover:bg-[#F2F3F5] border border-black/8 transition-colors cursor-pointer"
          >
            <span>Explore Architecture</span>
          </button>
        </div>
      </div>
    </section>
  );
};
