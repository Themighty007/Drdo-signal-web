import React, { useState, useEffect } from 'react';
import { ThreatEnvironment } from '../types';
import { THREAT_CONFIGS } from '../utils/audioSimulation';
import { WaveformCanvas } from './WaveformCanvas';
import { SpectrogramCanvas } from './SpectrogramCanvas';
import {
  Shield,
  Activity,
  Zap,
  RotateCw,
  Flame,
  Radio,
  Layers,
  Sliders,
  Play,
  Square,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const PrototypeSandbox: React.FC = () => {
  const [threat, setThreat] = useState<ThreatEnvironment>('helicopter');
  const [snr, setSnr] = useState<number>(-6);
  const [shieldVoiceActive, setShieldVoiceActive] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  // Stages status during activation
  const [stage1, setStage1] = useState<'idle' | 'active' | 'complete'>('idle');
  const [stage2, setStage2] = useState<'idle' | 'active' | 'complete'>('idle');
  const [stage3, setStage3] = useState<'idle' | 'active' | 'complete'>('idle');

  // Real-time jittering latency for realism
  const [latency, setLatency] = useState<number>(8.7);

  useEffect(() => {
    if (shieldVoiceActive) {
      const interval = setInterval(() => {
        // Subtle jitter around 8.4ms - 9.1ms
        const base = 8.7;
        const jitter = (Math.random() - 0.5) * 0.5;
        setLatency(Number((base + jitter).toFixed(1)));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [shieldVoiceActive]);

  const handleToggleShieldVoice = () => {
    if (shieldVoiceActive) {
      // Disengage immediately
      setShieldVoiceActive(false);
      setStage1('idle');
      setStage2('idle');
      setStage3('idle');
    } else {
      // Cinematic 1.5s sequential activation sequence
      setIsInitializing(true);
      setStage1('active');
      setStage2('idle');
      setStage3('idle');

      setTimeout(() => {
        setStage1('complete');
        setStage2('active');
      }, 400);

      setTimeout(() => {
        setStage2('complete');
        setStage3('active');
      }, 900);

      setTimeout(() => {
        setStage3('complete');
        setIsInitializing(false);
        setShieldVoiceActive(true);
      }, 1400);
    }
  };

  const threatIcons: Record<ThreatEnvironment, React.ElementType> = {
    gunshot: Zap,
    artillery: Flame,
    helicopter: RotateCw,
    siren: Radio,
    mixed: Layers,
  };

  const activeThreatConfig = THREAT_CONFIGS[threat];

  return (
    <section id="prototype" className="py-24 bg-[#FFFFFF] border-y border-black/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
                INTERACTIVE PROTOTYPE ENGINE // SIMULATION WORKSTATION
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-4 leading-tight">
              Put ShieldVoice to the test.
            </h2>

            <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
              Simulate extreme combat environments and observe how the 3-stage hybrid pipeline reconstructs intelligible speech in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono-tech text-xs bg-[#FAFAFA] px-4 py-2 rounded-xl border border-black/8 self-start lg:self-auto">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                shieldVoiceActive
                  ? 'bg-[#00A878] shadow-[0_0_8px_#00A878]'
                  : isInitializing
                  ? 'bg-[#1677FF] animate-ping'
                  : 'bg-[#555A61]'
              }`}
            />
            <span className="font-semibold text-[#08090A]">
              {shieldVoiceActive
                ? '● SHIELDVOICE ACTIVE'
                : isInitializing
                ? 'INITIALIZING PIPELINE...'
                : 'SIMULATION READY'}
            </span>
          </div>
        </div>

        {/* Master Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Control Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-2xl border border-black/8 p-6 flex flex-col gap-6 shadow-xs">
            {/* Threat Environment Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-[11px] font-bold text-[#08090A] uppercase tracking-wider">
                  Threat Environment
                </span>
                <span className="font-mono-tech text-[10px] text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded-sm">
                  {activeThreatConfig.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['helicopter', 'gunshot', 'artillery', 'siren', 'mixed'] as ThreatEnvironment[]).map(
                  (t) => {
                    const Icon = threatIcons[t];
                    const isSelected = threat === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setThreat(t)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-left font-medium text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#08090A] text-white shadow-xs'
                            : 'bg-white text-[#555A61] border border-black/6 hover:bg-white hover:text-[#08090A]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00A878]' : 'text-[#555A61]'}`} />
                        <span className="capitalize">{t}</span>
                      </button>
                    );
                  }
                )}
              </div>

              <div className="mt-3 p-3 bg-white rounded-xl border border-black/6 text-xs text-[#555A61] leading-relaxed">
                <strong className="text-[#08090A]">{activeThreatConfig.label}: </strong>
                {activeThreatConfig.description}
              </div>
            </div>

            {/* SNR Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tech text-[11px] font-bold text-[#08090A] uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#1677FF]" />
                  Input Signal-To-Noise Ratio (SNR)
                </span>
                <span className="font-mono-tech text-xs font-bold text-[#08090A] bg-white px-2.5 py-1 rounded-md border border-black/8">
                  {snr > 0 ? `+${snr}.0 dB` : `${snr}.0 dB`}
                </span>
              </div>

              <input
                type="range"
                min={-10}
                max={20}
                step={1}
                value={snr}
                onChange={(e) => setSnr(Number(e.target.value))}
                className="w-full accent-[#00A878] h-2 bg-black/10 rounded-lg cursor-pointer"
                aria-label="Input SNR Slider"
              />

              <div className="flex justify-between font-mono-tech text-[10px] text-[#555A61] mt-1.5">
                <span>-10 dB (Deep Noise)</span>
                <span>0 dB (Equal)</span>
                <span>+20 dB (Clear)</span>
              </div>
            </div>

            {/* Master Engage ShieldVoice Action */}
            <div className="pt-2 border-t border-black/6">
              <button
                onClick={handleToggleShieldVoice}
                disabled={isInitializing}
                className={`w-full py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-md ${
                  shieldVoiceActive
                    ? 'bg-[#00A878] hover:bg-[#009268] text-white'
                    : isInitializing
                    ? 'bg-[#1677FF] text-white opacity-90'
                    : 'bg-[#08090A] hover:bg-[#16181B] text-white hover:scale-[1.01]'
                }`}
              >
                {shieldVoiceActive ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>Disengage ShieldVoice</span>
                  </>
                ) : isInitializing ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Sequential Activation in Progress...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-[#00A878]" />
                    <span>Engage ShieldVoice Pipeline</span>
                  </>
                )}
              </button>
            </div>

            {/* Processing Stages Live Pipeline HUD */}
            <div className="bg-white rounded-xl p-4 border border-black/6 flex flex-col gap-2.5">
              <div className="font-mono-tech text-[10px] uppercase text-[#555A61] font-semibold tracking-wider">
                Stage Execution Pipeline Status
              </div>

              {[
                { label: '01 IMPULSIVE GATE', status: stage1 },
                { label: '02 SPECTRAL DNN', status: stage2 },
                { label: '03 NLMS FILTER', status: stage3 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[#08090A]">{s.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      s.status === 'complete' || (shieldVoiceActive && s.status === 'idle')
                        ? 'bg-[#00A878]/15 text-[#00A878]'
                        : s.status === 'active'
                        ? 'bg-[#1677FF]/15 text-[#1677FF] animate-pulse'
                        : 'bg-black/5 text-[#555A61]'
                    }`}
                  >
                    {shieldVoiceActive
                      ? 'ACTIVE / PASS'
                      : s.status === 'active'
                      ? 'PROCESSING'
                      : s.status === 'complete'
                      ? 'COMPLETE'
                      : 'STANDBY'}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Latency & Edge Footprint Telemetry */}
            <div className="grid grid-cols-2 gap-2 font-mono-tech">
              <div className="p-3 bg-white rounded-xl border border-black/6">
                <div className="text-[9px] text-[#555A61]">PROCESSING LATENCY</div>
                <div className="text-lg font-bold text-[#00A878]">
                  {shieldVoiceActive ? `${latency} ms` : '0.0 ms'}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-black/6">
                <div className="text-[9px] text-[#555A61]">EDGE MEMORY USE</div>
                <div className="text-lg font-bold text-[#08090A]">840 KB</div>
              </div>
            </div>
          </div>

          {/* Right Visualizers Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Audio In Visualizer */}
            <WaveformCanvas
              threat={threat}
              snr={snr}
              shieldVoiceActive={false}
              type="in"
              label="AUDIO IN // BATTLEFIELD CAPTURE (RAW TRANSIENT + NOISE)"
            />

            {/* Audio Out Visualizer */}
            <WaveformCanvas
              threat={threat}
              snr={snr}
              shieldVoiceActive={shieldVoiceActive}
              type="out"
              label="AUDIO OUT // SHIELDVOICE PROCESSED SPEECH STREAM"
            />

            {/* Real-time STFT 2D Spectrogram */}
            <SpectrogramCanvas
              threat={threat}
              snr={snr}
              shieldVoiceActive={shieldVoiceActive}
            />

            {/* Honest Simulation Disclaimer Label */}
            <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#555A61] px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A878]" />
                <span>INTERACTIVE PROTOTYPE ENGINE // SIMULATED SIGNAL</span>
              </div>
              <span>DRDO BENCHMARK COMPLIANT MODEL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
