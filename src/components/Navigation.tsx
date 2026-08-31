import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Menu, X, Cpu } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      // Section spy
      const sections = ['technology', 'architecture', 'prototype', 'performance', 'deployment'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'technology', label: 'Technology' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'prototype', label: 'Prototype' },
    { id: 'performance', label: 'Performance' },
    { id: 'deployment', label: 'Deployment' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-white/85 backdrop-blur-md border-b border-black/6 shadow-xs'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: ShieldVoice Brand */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
          aria-label="ShieldVoice Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#08090A] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Shield className="w-4 h-4 text-[#00A878]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[15px] tracking-tight text-[#08090A] flex items-center gap-1.5">
              SHIELDVOICE
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00A878] animate-pulse" />
            </span>
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#555A61]">
              DEFENSE SIGNAL AI
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/8 shadow-2xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3.5 py-1 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                activeSection === link.id
                  ? 'bg-[#08090A] text-white shadow-2xs'
                  : 'text-[#555A61] hover:text-[#08090A] hover:bg-black/4'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Refined CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="font-mono-tech text-[10px] text-[#555A61] flex items-center gap-1.5 border-r border-black/10 pr-3">
            <Cpu className="w-3 h-3 text-[#00A878]" />
            <span>&lt;10 MS LATENCY</span>
          </div>
          <button
            onClick={() => onNavigate('prototype')}
            className="group relative inline-flex items-center gap-2 bg-[#08090A] text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 hover:bg-[#16181B] hover:shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            <span>Initialize Prototype</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#00A878]" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#08090A] hover:bg-black/5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/8 px-6 py-5 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[15px] font-medium text-[#08090A] hover:text-[#00A878]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('prototype');
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#08090A] text-white py-2.5 rounded-lg text-[14px] font-medium"
          >
            <span>Initialize Prototype</span>
            <ArrowRight className="w-4 h-4 text-[#00A878]" />
          </button>
        </div>
      )}
    </header>
  );
};
