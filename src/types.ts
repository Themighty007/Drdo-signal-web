export type ThreatEnvironment = 'gunshot' | 'artillery' | 'helicopter' | 'siren' | 'mixed';

export type ProcessingStageStatus = 'idle' | 'initializing' | 'active' | 'complete' | 'standby';

export interface ThreatConfig {
  id: ThreatEnvironment;
  label: string;
  category: 'Impulsive' | 'Non-Stationary' | 'Stationary' | 'Multi-Threat';
  description: string;
  spectralProfile: string;
  primaryStage: string;
  iconName: string;
  baseSnr: number;
}

export interface MetricData {
  id: string;
  label: string;
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  caption: string;
  drdoTarget?: string;
  drdoNumeric?: number;
  highlight?: boolean;
}

export interface ArchitectureStageInfo {
  id: string;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  pipelineSteps: string[];
  equation?: string;
  accentColor: string;
}

export interface SimulationState {
  threat: ThreatEnvironment;
  snr: number;
  shieldVoiceActive: boolean;
  isInitializing: boolean;
  stage1Status: ProcessingStageStatus;
  stage2Status: ProcessingStageStatus;
  stage3Status: ProcessingStageStatus;
  latencyMs: number;
  measuredSnrGain: number;
  stoiScore: number;
  pesqScore: number;
}
