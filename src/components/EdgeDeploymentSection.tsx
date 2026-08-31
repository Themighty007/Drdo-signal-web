import React from 'react';
import { Cpu, HardDrive, WifiOff, Terminal, Shield, ArrowRight } from 'lucide-react';

export const EdgeDeploymentSection: React.FC = () => {
  const hardwareTargets = [
    {
      name: 'Raspberry Pi 4 / Compute Module',
      spec: 'ARM Cortex-A72 @ 1.5GHz / 2GB RAM',
      inference: 'TFLite INT8 / 6.2 ms Latency',
      status: 'Fully Validated',
    },
    {
      name: 'NVIDIA Jetson Nano / Orin Nano',
      spec: '128-core Maxwell / TensorRT',
      inference: 'ONNX Runtime / 3.8 ms Latency',
      status: 'High-Throughput Mode',
    },
    {
      name: 'ARM Cortex-M55 / DSP Embedded',
      spec: 'Helium Vector Extension / Microcontrollers',
      inference: 'CMSIS-NN / 8.9 ms Latency',
      status: 'Ultra-Low Power',
    },
  ];

  return (
    <section id="deployment" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-black/8 shadow-2xs mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#1677FF]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#555A61]">
              EDGE EMBEDDED INFERENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-[#08090A] mb-6 leading-tight">
            Advanced signal intelligence <br />
            shouldn't require a supercomputer.
          </h2>

          <p className="text-base sm:text-lg text-[#555A61] leading-relaxed">
            ShieldVoice eliminates reliance on expensive cloud data centers or power-hungry GPUs.
            With an INT8 quantized footprint under 1 MB, the entire 3-stage pipeline runs natively on low-power
            tactical edge hardware.
          </p>
        </div>

        {/* Edge Pipeline Visual Flow */}
        <div className="bg-[#FAFAFA] rounded-3xl border border-black/8 p-8 mb-12">
          <div className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#555A61] mb-6">
            LOCAL AIR-GAPPED SIGNAL PIPELINE // ZERO NETWORK LATENCY
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Dual Microphones', desc: 'Primary + Reference acoustic capture' },
              { step: '02', title: 'Edge Hardware', desc: 'Local ADC & buffer segmentation' },
              { step: '03', title: 'Stage 1 DSP Gate', desc: '<1ms transient energy suppression' },
              { step: '04', title: 'Stage 2 DTLN AI', desc: 'STFT speech formant mask separation' },
              { step: '05', title: 'Clean Radio Out', desc: 'Zero cloud latency (<10ms delivery)' },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-tech text-xs font-bold text-[#00A878] mb-2 block">
                    STEP {p.step}
                  </span>
                  <div className="font-bold text-base text-[#08090A] mb-1">{p.title}</div>
                  <div className="text-xs text-[#555A61] leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Compatibility Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {hardwareTargets.map((hw) => (
            <div
              key={hw.name}
              className="p-6 bg-[#FAFAFA] rounded-2xl border border-black/8 hover:border-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#08090A] text-white flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-[#00A878]" />
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#00A878] bg-[#00A878]/10 px-2 py-0.5 rounded-sm font-semibold">
                    {hw.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#08090A] mb-2">{hw.name}</h3>
                <div className="text-xs text-[#555A61] font-mono-tech mb-4">{hw.spec}</div>
              </div>

              <div className="pt-4 border-t border-black/6 font-mono-tech text-xs text-[#08090A] flex items-center justify-between">
                <span className="text-[#555A61]">RUNTIME:</span>
                <span className="font-semibold">{hw.inference}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Security Callout */}
        <div className="p-8 rounded-2xl bg-[#08090A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#00A878]">
              <WifiOff className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono-tech text-xs text-[#00A878] uppercase tracking-wider mb-0.5">
                AIR-GAPPED DEFENSE COMPLIANCE
              </div>
              <div className="text-xl font-bold tracking-tight">
                100% Offline Inference. Zero Cloud Transmission.
              </div>
            </div>
          </div>
          <div className="font-mono-tech text-xs text-white/70 max-w-sm">
            All neural weights and DSP operations execute entirely inside local secure memory, eliminating electronic warfare interception risk.
          </div>
        </div>
      </div>
    </section>
  );
};
