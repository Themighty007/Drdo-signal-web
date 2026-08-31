import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { TraditionalFailureSection } from './components/TraditionalFailureSection';
import { SignatureMoment } from './components/SignatureMoment';
import { ArchitectureSection } from './components/ArchitectureSection';
import { PrototypeSandbox } from './components/PrototypeSandbox';
import { PerformanceMetricsSection } from './components/PerformanceMetricsSection';
import { EdgeDeploymentSection } from './components/EdgeDeploymentSection';
import { DatasetPipelineSection } from './components/DatasetPipelineSection';
import { TechnicalDeepDiveSection } from './components/TechnicalDeepDiveSection';
import { FinalStatementSection } from './components/FinalStatementSection';
import { Footer } from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1.0, Math.max(0, currentScroll / totalScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#08090A] flex flex-col font-sans selection:bg-[#00A878]/15 selection:text-[#08090A]">
      {/* Ultra-thin Global Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-linear-to-r from-[#1677FF] via-[#00A878] to-[#00A878] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Main Navigation */}
      <Navigation onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with 3D Acoustic Intelligence Signal Core */}
        <HeroSection
          scrollProgress={scrollProgress}
          onExploreClick={() => scrollToSection('architecture')}
          onInitializeClick={() => scrollToSection('prototype')}
        />

        {/* 2. Problem Section: Battlefield Acoustic Threats */}
        <ProblemSection />

        {/* 3. Traditional Filter Failure Breakdown */}
        <TraditionalFailureSection />

        {/* 4. The Signature Moment: Chaos to Clarity */}
        <SignatureMoment />

        {/* 5. 3-Stage Hybrid Architecture */}
        <ArchitectureSection />

        {/* 6. The Prototype Sandbox: Interactive Audio Workstation */}
        <PrototypeSandbox />

        {/* 7. Performance & Defense Benchmark Metrics */}
        <PerformanceMetricsSection />

        {/* 8. Edge Embedded Deployment (Raspberry Pi, TFLite, ONNX) */}
        <EdgeDeploymentSection />

        {/* 9. Dynamic Dataset Synthesizer & Augmentation */}
        <DatasetPipelineSection />

        {/* 10. Technical Deep Dive (Equations & Proofs) */}
        <TechnicalDeepDiveSection />

        {/* 11. Final Editorial Statement & CTAs */}
        <FinalStatementSection
          onInitializeClick={() => scrollToSection('prototype')}
          onExploreClick={() => scrollToSection('architecture')}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
