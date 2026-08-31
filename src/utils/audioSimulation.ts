import { ThreatConfig, ThreatEnvironment } from '../types';

export const THREAT_CONFIGS: Record<ThreatEnvironment, ThreatConfig> = {
  gunshot: {
    id: 'gunshot',
    label: 'Gunshot',
    category: 'Impulsive',
    description: 'High-energy explosive acoustic spike with sub-millisecond rise time and broadband frequency burst.',
    spectralProfile: 'Extreme impulse transient (>5x ambient) spanning 100 Hz – 12 kHz',
    primaryStage: 'Stage 01: Impulsive Noise Gate',
    iconName: 'Zap',
    baseSnr: -8,
  },
  artillery: {
    id: 'artillery',
    label: 'Artillery',
    category: 'Impulsive',
    description: 'Massive low-frequency blast wave followed by secondary ground resonance and decaying reverberation.',
    spectralProfile: 'Sub-bass peak at 35–120 Hz with heavy harmonic distortion',
    primaryStage: 'Stage 01 + Stage 02 Dual Response',
    iconName: 'Flame',
    baseSnr: -10,
  },
  helicopter: {
    id: 'helicopter',
    label: 'Helicopter',
    category: 'Non-Stationary',
    description: 'Periodic amplitude-modulated rotor blade slap with strong blade-pass frequency harmonics.',
    spectralProfile: 'Blade pass fundamental (15–25 Hz) + strong harmonics up to 4 kHz',
    primaryStage: 'Stage 02: Spectral Gating DNN',
    iconName: 'RotateCw',
    baseSnr: -6,
  },
  siren: {
    id: 'siren',
    label: 'Siren',
    category: 'Non-Stationary',
    description: 'Frequency-modulated wail spanning 600 Hz – 1.8 kHz, continuously shifting spectral peaks.',
    spectralProfile: 'Dynamic Doppler-swept tone with varying frequency slope',
    primaryStage: 'Stage 02: Spectral Gating DNN',
    iconName: 'Radio',
    baseSnr: -4,
  },
  mixed: {
    id: 'mixed',
    label: 'Mixed Combat',
    category: 'Multi-Threat',
    description: 'Complex battlefield cocktail combining engine rumble, rotor chop, wind noise, and sporadic gunfire.',
    spectralProfile: 'Dense multi-spectral interference with simultaneous impulse & stationary noise',
    primaryStage: 'Full 3-Stage Hybrid Pipeline',
    iconName: 'Layers',
    baseSnr: -9,
  },
};

/**
 * Generates synthetic speech signal value at normalized phase t
 */
export function getSpeechSample(t: number): number {
  // Speech formant approximation with fundamental frequency F0 ~ 130 Hz and formant bands
  const f0 = 2.4;
  const envelope = Math.sin(t * 1.8) * Math.sin(t * 0.45);
  const speechFormants = 
    Math.sin(t * f0 * 2 * Math.PI) * 0.6 +
    Math.sin(t * f0 * 3.8 * Math.PI) * 0.35 +
    Math.sin(t * f0 * 7.2 * Math.PI) * 0.2 +
    Math.sin(t * f0 * 12.5 * Math.PI) * 0.1;

  return speechFormants * Math.max(0, envelope);
}

/**
 * Generates threat noise sample based on type and phase t
 */
export function getThreatNoiseSample(threat: ThreatEnvironment, t: number, timeMs: number): number {
  switch (threat) {
    case 'gunshot': {
      // Periodic sharp impulse transient spike
      const period = 3.5;
      const localTime = (timeMs / 1000) % period;
      if (localTime < 0.08) {
        const decay = Math.exp(-localTime * 45);
        return Math.sin(t * 85) * 4.2 * decay;
      }
      return (Math.random() - 0.5) * 0.15;
    }
    case 'artillery': {
      // Low frequency shockwave + blast envelope
      const period = 4.5;
      const localTime = (timeMs / 1000) % period;
      if (localTime < 0.45) {
        const decay = Math.exp(-localTime * 8);
        return (Math.sin(t * 14) * 3.2 + Math.sin(t * 28) * 1.8 + (Math.random() - 0.5) * 1.2) * decay;
      }
      return Math.sin(t * 4) * 0.3 + (Math.random() - 0.5) * 0.2;
    }
    case 'helicopter': {
      // Amplitude-modulated rotor blade slap
      const rotorFreq = 6.2;
      const bladeSlap = Math.pow(Math.max(0, Math.sin(t * rotorFreq)), 4) * 2.2;
      const engineHum = Math.sin(t * 18.5) * 0.4 + Math.sin(t * 37.0) * 0.25;
      return bladeSlap + engineHum + (Math.random() - 0.5) * 0.35;
    }
    case 'siren': {
      // FM sweep siren
      const sweepRate = 1.2;
      const sweepFreq = 8 + Math.sin(t * sweepRate) * 5;
      return Math.sin(t * sweepFreq * 2.5) * 1.6 + (Math.random() - 0.5) * 0.25;
    }
    case 'mixed': {
      // Mixed battle: rotor + hum + occasional gunshot + wind
      const rotor = Math.pow(Math.max(0, Math.sin(t * 4.8)), 3) * 1.4;
      const wind = Math.sin(t * 1.5) * 0.5 + (Math.random() - 0.5) * 0.4;
      const period = 3.0;
      const localTime = (timeMs / 1000) % period;
      const gunshot = localTime < 0.06 ? Math.sin(t * 60) * 3.5 * Math.exp(-localTime * 50) : 0;
      return rotor + wind + gunshot + Math.sin(t * 22) * 0.3;
    }
    default:
      return (Math.random() - 0.5) * 0.5;
  }
}

/**
 * Compute raw audio sample, filtered sample, and stage signals
 */
export function computeSignalFrame(
  t: number,
  timeMs: number,
  threat: ThreatEnvironment,
  snr: number,
  shieldVoiceActive: boolean
) {
  const speech = getSpeechSample(t);
  const rawNoise = getThreatNoiseSample(threat, t, timeMs);

  // Convert SNR dB to noise scaling factor
  // 0 dB -> scale 1.0, -10 dB -> scale ~3.16, +20 dB -> scale ~0.1
  const snrLinearRatio = Math.pow(10, -snr / 20);
  const scaledNoise = rawNoise * snrLinearRatio;

  const audioIn = speech + scaledNoise;

  let audioOut = audioIn;
  let stage1Output = audioIn;
  let stage2Output = audioIn;
  let stage3Output = audioIn;

  if (shieldVoiceActive) {
    // Stage 1: Impulsive Gate clamps spikes > 5x ambient
    const threshold = 1.2;
    stage1Output = Math.max(-threshold, Math.min(threshold, audioIn));

    // Stage 2: Spectral DNN suppresses non-stationary mask bands
    // Retains speech formant components while drastically suppressing non-speech noise
    const noiseReductionFactor = 0.08;
    stage2Output = speech + (stage1Output - speech) * noiseReductionFactor;

    // Stage 3: Adaptive NLMS eliminates residual stationary channel
    const residualNoise = (stage2Output - speech) * 0.25;
    stage3Output = speech + residualNoise;

    audioOut = stage3Output;
  }

  return {
    speech,
    scaledNoise,
    audioIn,
    audioOut,
    stage1Output,
    stage2Output,
    stage3Output,
  };
}
