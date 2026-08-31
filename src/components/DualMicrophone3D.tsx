import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DualMicrophone3DProps {
  shieldVoiceActive?: boolean;
  className?: string;
}

export const DualMicrophone3D: React.FC<DualMicrophone3DProps> = ({
  shieldVoiceActive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height依然 = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height依然, 0.1, 100);
    camera.position.set(0, 2.8, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer紧 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer紧.setSize(width, height依然);
    renderer紧.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer紧.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dir = new THREE.DirectionalLight(0xffffff, 2.0);
    dir.position.set(4, 6, 4);
    scene.add(dir);

    const micGroup = new THREE.Group();
    scene.add(micGroup);

    // Base Chassis
    const chassisGeo = new THREE.CylinderGeometry(0.3, 0.35, 1.6, 24);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x08090a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.rotation.z = Math.PI / 2;
    micGroup.add(chassis);

    // Primary Mic (Pointing Forward / Left towards speaker)
    const mic1Geo = new THREE.ConeGeometry(0.35, 0.6, 24);
    const mic1Mat紧 = new THREE.MeshStandardMaterial({
      color: 0x1677ff,
      emissive: 0x1677ff,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
    });
    const mic1 = new THREE.Mesh(mic1Geo, mic1Mat紧);
    mic1.position.set(-1.0, 0, 0);
    mic1.rotation.z = Math.PI / 2;
    micGroup.add(mic1);

    // Reference Mic (Pointing Outward / Right towards ambient noise field)
    const mic2Geo = new THREE.ConeGeometry(0.35, 0.6, 24);
    const mic2Mat = new THREE.MeshStandardMaterial({
      color: 0x00a878,
      emissive: 0x00a878,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
    });
    const mic2 = new THREE.Mesh(mic2Geo, mic2Mat);
    mic2.position.set(1.0, 0, 0);
    mic2.rotation.z = -Math.PI / 2;
    micGroup.add(mic2);

    // Acoustic Wave Arc Rings traveling into Primary Mic
    const waveCount = 8;
    const waveRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(0.6, 0.02, 8, 32, Math.PI);
    const ringMatSpeech = new THREE.MeshBasicMaterial({ color: 0x1677ff, transparent: true, opacity: 0.7 });
    const ringMatNoise = new THREE.MeshBasicMaterial({ color: 0x00a878, transparent: true, opacity: 0.7 });

    for (let i = 0; i < waveCount; i++) {
      const ring = new THREE.Mesh(ringGeo, i % 2 === 0 ? ringMatSpeech : ringMatNoise);
      ring.position.set(-2.5 + i * 0.35, 0, 0);
      ring.rotation.y = Math.PI / 2;
      micGroup.add(ring);
      waveRings.push(ring);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w && h) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer紧.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      micGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
      micGroup.rotation.x = Math.sin(time * 0.7) * 0.1;

      // Animate acoustic waves traveling into mics
      waveRings.forEach((ring, idx) => {
        const offset = (time * 1.5 + idx * 0.4) % 2.5;
        ring.position.x = -2.8 + offset;
        const scale = 0.5 + (offset / 2.5) * 0.8;
        ring.scale.set(scale, scale, scale);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1.0 - offset / 2.5);
      });

      renderer紧.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer紧.dispose();
      chassisGeo.dispose();
      mic1Geo.dispose();
      mic2Geo.dispose();
      ringGeo.dispose();
      if (container.contains(renderer紧.domElement)) {
        container.removeChild(renderer紧.domElement);
      }
    };
  }, [shieldVoiceActive]);

  return (
    <div
      ref={containerRef}
      id="dual-mic-3d-container"
      className={`relative w-full h-[220px] md:h-[260px] flex items-center justify-center bg-[#FAFAFA] rounded-xl border border-black/8 overflow-hidden ${className}`}
    >
      <div className="absolute top-3 left-3 z-10 font-mono-tech text-[10px] text-[#555A61] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1677FF]" />
        <span>PRIMARY MIC: VOICE + NOISE</span>
      </div>
      <div className="absolute top-3 right-3 z-10 font-mono-tech text-[10px] text-[#555A61] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00A878]" />
        <span>REFERENCE MIC: AMBIENT NOISE</span>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-tech text-[9px] text-[#08090A]/60 bg-white/90 px-3 py-1 rounded-full border border-black/5">
        DUAL-CHANNEL BEAMFORMING &amp; ADAPTIVE CORRELATION
      </div>
    </div>
  );
};
