import React from 'react';
import { Shield, ArrowUp, Cpu, HardDrive, WifiOff, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'technology', label: 'Technology' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'prototype', label: 'Prototype' },
    { id: 'performance', label: 'Performance' },
    { id: 'deployment', label: 'Deployment' },
  ];

  const badges = [
    'EDGE AI READY',
    'RASPBERRY PI & JETSON COMPATIBLE',
    '100% OFFLINE INFERENCE',
    '<10 MS LATENCY BUDGET',
    '<1 MB PARAMETER FOOTPRINT',
  ];

  return (
    <footer className="bg-[#FAFAFA] border-t border-black/8 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-12 border-b border-black/6">
          {badges.map((b) => (
            <div
              key={b}
              className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[#555A61] bg-white px-3 py-1.5 rounded-full border border-black/6"
            >
              <CheckCircle2 className="w-3 h-3 text-[#00A878]" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        {/* Main Footer Row */}
        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#08090A] text-white flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#00A878]" />
              </div>
              <span className="font-bold text-lg text-[#08090A] tracking-tight">SHIELDVOICE</span>
            </div>
            <p className="text-xs text-[#555A61] max-w-sm leading-relaxed">
              Adaptive AI + DSP noise cancellation engineered for extreme mission-critical defense communications.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-xs font-medium text-[#555A61] hover:text-[#08090A] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono-tech text-xs text-[#555A61] hover:text-[#08090A] bg-white p-2.5 rounded-xl border border-black/8 transition-all hover:scale-105 cursor-pointer shadow-2xs"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00A878]" />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 border-t border-black/6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-[#555A61]/70">
          <div>© {new Date().getFullYear()} SHIELDVOICE SIGNAL INTELLIGENCE LABS. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4">
            <span>DRDO BENCHMARK COMPLIANT SPECIFICATION</span>
            <span>INT8 QUANTIZED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
