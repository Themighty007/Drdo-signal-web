import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Architecture3DProps {
  activeStageIndex?: number;
  onSelectStage?: (index: number) => void;
  className?: string;
}

export const Architecture3D: React.FC<Architecture3DProps> = ({
  activeStageIndex = 0,
  onSelectStage,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const emeraldLight = new THREE.PointLight(0x00A878, 3, 15);
    emeraldLight.position.set(-3, 2, 3);
    scene.add(emeraldLight);

    const blueLight = new THREE.PointLight(0x1677FF, 3, 15);
    blueLight.position.set(3, 2, -2);
    scene.add(blueLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // 3 Modules representing Stage 1 (Impulsive), Stage 2 (Spectral DNN), Stage 3 (Adaptive NLMS)
    const modules: THREE.Group[] = [];
    const modulePositions = [
      new THREE.Vector3(-3.2, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3.2, 0, 0),
    ];

    const stageColors = [0x08090A, 0x1677FF, 0x00A878];

    for (let i = 0; i < 3; i++) {
      const group = new THREE.Group();
      group.position.copy(modulePositions[i]);

      // Base Glass/Titanium Platform
      const boxGeo = new THREE.BoxGeometry(2.0, 1.2, 1.8);
      const boxMat = new THREE.MeshStandardMaterial({
        color: stageColors[i],
        metalness: 0.8,
        roughness: 0.25,
        wireframe: false,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      group.add(box);

      // Outer Wireframe Cage
      const wireGeo = new THREE.BoxGeometry(2.1, 1.3, 1.9);
      const wireMat = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x1677ff : i === 2 ? 0x00a878 : 0x444850,
        wireframe: true,
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      group.add(wire);

      // Inner Core Indicator
      const coreIndicatorGeo = new THREE.OctahedronGeometry(0.4, 0);
      const coreIndicatorMat = new THREE.MeshStandardMaterial({
        color: i === 2 ? 0x00a878 : i === 1 ? 0x1677ff : 0xffffff,
        emissive: i === 2 ? 0x00a878 : i === 1 ? 0x1677ff : 0x555a61,
        emissiveIntensity: 0.6,
      });
      const coreMesh = new THREE.Mesh(coreIndicatorGeo, coreIndicatorMat);
      coreMesh.position.y = 1.1;
      group.add(coreMesh);

      stageGroup.add(group);
      modules.push(group);
    }

    // Connecting Signal Bus / Conduits between Stage 1 -> 2 -> 3
    const pipePoints1 = [new THREE.Vector3(-2.1, 0, 0), new THREE.Vector3(-1.1, 0, 0)];
    const pipePoints2 = [new THREE.Vector3(1.1, 0, 0), new THREE.Vector3(2.1, 0, 0)];

    const pipeGeo1 = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pipePoints1), 20, 0.06, 8, false);
    const pipeGeo2 = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pipePoints2), 20, 0.06, 8, false);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x00a878,
      emissive: 0x00a878,
      emissiveIntensity: 0.7,
      metalness: 0.9,
    });

    const pipe1 = new THREE.Mesh(pipeGeo1, pipeMat);
    const pipe2 = new THREE.Mesh(pipeGeo2, pipeMat);
    stageGroup.add(pipe1);
    stageGroup.add(pipe2);

    // Traveling Signal Pulse Packets
    const pulseCount = 18;
    const pulseGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00a878 });
    const pulseMesh = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);
    stageGroup.add(pulseMesh);

    const dummy = new THREE.Object3D();

    // Resize Handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w && h) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle isometric levitation
      stageGroup.rotation.y = Math.sin(time * 0.4) * 0.15 + 0.1;
      stageGroup.position.y = Math.sin(time * 1.2) * 0.08;

      // Animate module core indicators
      modules.forEach((mod, idx) => {
        const core = mod.children[2];
        if (core) {
          core.rotation.y = time * (1.2 + idx * 0.4);
          core.rotation.z = time * 0.8;
          // Scale up active stage module
          const targetY = idx === activeStageIndex ? 0.35 : 0;
          mod.position.y = THREE.MathUtils.lerp(mod.position.y, targetY, 0.08);
        }
      });

      // Animate traveling signal pulses across pipeline
      for (let i = 0; i < pulseCount; i++) {
        const t = ((time * 0.8 + i / pulseCount) % 1.0);
        const x = THREE.MathUtils.lerp(-4.5, 4.5, t);
        dummy.position.set(x, Math.sin(t * Math.PI * 4) * 0.12, 0);
        dummy.scale.setScalar(t > 0.8 ? 1.3 : 0.9);
        dummy.updateMatrix();
        pulseMesh.setMatrixAt(i, dummy.matrix);
      }
      pulseMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      pipeGeo1.dispose();
      pipeGeo2.dispose();
      pipeMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeStageIndex]);

  return (
    <div
      ref={containerRef}
      id="architecture-3d-container"
      className={`relative w-full h-[320px] md:h-[420px] flex items-center justify-center ${className}`}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1 font-mono-tech text-[9px] text-[#555A61] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/10">
        <span className="text-[#00A878] font-semibold">HYBRID PIPELINE</span> // STAGES 01 → 03
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {['01 IMPULSIVE GATE', '02 SPECTRAL DNN', '03 ADAPTIVE NLMS'].map((label, idx) => (
          <button
            key={label}
            onClick={() => onSelectStage?.(idx)}
            className={`px-3 py-1 rounded-full font-mono-tech text-[10px] tracking-wider transition-all cursor-pointer ${
              activeStageIndex === idx
                ? 'bg-[#08090A] text-white shadow-xs scale-105'
                : 'bg-white/85 text-[#555A61] hover:text-[#08090A] border border-black/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
