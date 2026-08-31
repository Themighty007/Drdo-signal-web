import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SignalCore3DProps {
  scrollProgress?: number;
  isCleanSignal?: boolean;
  interactive?: boolean;
  className?: string;
  threatType?: string;
}

export const SignalCore3D: React.FC<SignalCore3DProps> = ({
  scrollProgress = 0,
  isCleanSignal = false,
  interactive = true,
  className = '',
  threatType = 'mixed',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHud, setActiveHud] = useState<'INPUT' | 'DNN' | 'NLMS' | 'OUTPUT'>('DNN');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    // Tactical Emerald Rim Light (#00A878)
    const emeraldRim = new THREE.PointLight(0x00A878, 3.5, 20);
    emeraldRim.position.set(-4, -2, 4);
    scene.add(emeraldRim);

    // Electric Blue Rim Light (#1677FF)
    const blueRim = new THREE.PointLight(0x1677FF, 3.0, 20);
    blueRim.position.set(4, 3, -3);
    scene.add(blueRim);

    // --- Core Master Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Computational Core (Faceted Titanium & Glass Core)
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x08090a,
      emissive: 0x00a878,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // Outer Faceted Crystal / Titanium Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x111315,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: true,
    });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cage);

    // Inner Micro-circuit nodes
    const nodePointsGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.95 + Math.random() * 0.25;
      nodePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nodePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    nodePointsGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodePointsMat = new THREE.PointsMaterial({
      color: 0x00a878,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(nodePointsGeo, nodePointsMat);
    coreGroup.add(nodePoints);

    // 2. Concentric Acoustic Rings (3 Distinct Precision Layers)
    const ring1Geo = new THREE.TorusGeometry(1.75, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x1677ff,
      emissive: 0x1677ff,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.2, 0.025, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00a878,
      emissive: 0x00a878,
      emissiveIntensity: 0.4,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 140);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x22262a,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    masterGroup.add(ring3);

    // 3. Procedural 3D Waveform Ribbon
    const waveSegments = 160;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveSegments * 3);
    for (let i = 0; i < waveSegments; i++) {
      const angle = (i / waveSegments) * Math.PI * 2;
      const radius = 2.0;
      wavePos[i * 3] = Math.cos(angle) * radius;
      wavePos[i * 3 + 1] = Math.sin(angle) * radius;
      wavePos[i * 3 + 2] = 0;
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    const waveMat = new THREE.LineBasicMaterial({
      color: 0x00a878,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const waveLine = new THREE.LineLoop(waveGeo, waveMat);
    masterGroup.add(waveLine);

    // 4. Dual-State Particle System: Chaotic Noise vs. Clean Coherent Stream
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);
    const noisePositions = new Float32Array(particleCount * 3);
    const cleanPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Chaotic noise position: scattered in irregular cloud
      const noiseRadius = 1.5 + Math.random() * 2.8;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      noisePositions[i * 3] = noiseRadius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 0.8;
      noisePositions[i * 3 + 1] = noiseRadius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 0.8;
      noisePositions[i * 3 + 2] = noiseRadius * Math.cos(phi) + (Math.random() - 0.5) * 0.8;

      // Clean signal position: organized in coherent toroidal / helical streams
      const angle = (i / particleCount) * Math.PI * 4;
      const cleanRadius = 2.0 + Math.sin(angle * 3) * 0.25;
      const height = (i / particleCount - 0.5) * 2.5;
      cleanPositions[i * 3] = Math.cos(angle) * cleanRadius;
      cleanPositions[i * 3 + 1] = height;
      cleanPositions[i * 3 + 2] = Math.sin(angle) * cleanRadius;

      // Initial blend
      currentPositions[i * 3] = noisePositions[i * 3];
      currentPositions[i * 3 + 1] = noisePositions[i * 3 + 1];
      currentPositions[i * 3 + 2] = noisePositions[i * 3 + 2];

      // Colors: tactical emerald (0x00, 0xA8, 0x78) and electric blue (0x16, 0x77, 0xFF)
      const isEmerald = Math.random() > 0.4;
      if (isEmerald) {
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 0.66;
        particleColors[i * 3 + 2] = 0.47;
      } else {
        particleColors[i * 3] = 0.08;
        particleColors[i * 3 + 1] = 0.46;
        particleColors[i * 3 + 2] = 1.0;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleSystem);

    // --- Interaction Listeners ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      masterGroup.rotation.y += deltaX * 0.008;
      masterGroup.rotation.x += deltaY * 0.008;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.6;
        mouseRef.current.targetY = y * 0.6;
      }
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleDrag);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    // --- Resize Observer ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth && newHeight) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Master rotation with subtle parallax
      if (!isDragging) {
        masterGroup.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.4;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + mouseRef.current.y * 0.4;
      }

      // Contra-rotating rings
      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.28;
      ring3.rotation.y = elapsedTime * 0.2;

      // Core pulsating scale
      const pulse = 1.0 + Math.sin(elapsedTime * 2.5) * 0.04;
      innerSphere.scale.set(pulse, pulse, pulse);
      cage.rotation.y = -elapsedTime * 0.18;
      cage.rotation.z = elapsedTime * 0.12;

      // Animate 3D Waveform Loop
      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const cleanFactor = isCleanSignal ? 1.0 : Math.min(1.0, scrollProgress * 1.5);

      for (let i = 0; i < waveSegments; i++) {
        const angle = (i / waveSegments) * Math.PI * 2;
        // Modulate with noise vs pure harmonic
        const noisePerturbation = Math.sin(angle * 8 + elapsedTime * 6) * 0.3 * (1 - cleanFactor * 0.85);
        const harmonicPerturbation = Math.sin(angle * 4 + elapsedTime * 3) * 0.15 * cleanFactor;
        const r = 2.0 + noisePerturbation + harmonicPerturbation;

        posAttr.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(angle * 3 + elapsedTime * 2) * 0.2);
      }
      posAttr.needsUpdate = true;

      // Interpolate Particle Positions between Noise Cloud and Coherent Helix
      const partPosAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const targetCleanBlend = isCleanSignal ? 1.0 : Math.min(1.0, scrollProgress * 1.2);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Add orbital movement to clean positions
        const orbitalAngle = elapsedTime * 0.4 + (i / particleCount) * Math.PI * 4;
        const cleanRad = 2.0 + Math.sin(orbitalAngle * 3) * 0.25;
        const currentCleanX = Math.cos(orbitalAngle) * cleanRad;
        const currentCleanZ = Math.sin(orbitalAngle) * cleanRad;
        const currentCleanY = (i / particleCount - 0.5) * 2.5;

        // Dynamic noise flutter
        const noiseX = noisePositions[i3] + Math.sin(elapsedTime * 2 + i) * 0.08;
        const noiseY = noisePositions[i3 + 1] + Math.cos(elapsedTime * 2.5 + i) * 0.08;
        const noiseZ = noisePositions[i3 + 2] + Math.sin(elapsedTime * 1.8 + i) * 0.08;

        const curX = THREE.MathUtils.lerp(noiseX, currentCleanX, targetCleanBlend);
        const curY = THREE.MathUtils.lerp(noiseY, currentCleanY, targetCleanBlend);
        const curZ = THREE.MathUtils.lerp(noiseZ, currentCleanZ, targetCleanBlend);

        partPosAttr.setXYZ(i, curX, curY, curZ);
      }
      partPosAttr.needsUpdate = true;

      // Emissive core brightness modulation on hover / clean state
      const targetEmissive = isHovered || isCleanSignal ? 0.85 : 0.45;
      innerSphereMat.emissiveIntensity = THREE.MathUtils.lerp(
        innerSphereMat.emissiveIntensity,
        targetEmissive,
        0.08
      );

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleDrag);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      renderer.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive, isHovered, scrollProgress, isCleanSignal, threatType]);

  return (
    <div
      ref={containerRef}
      id="signal-core-3d-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full min-h-[420px] md:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Acoustic Intelligence Core Visualization"
    >
      {/* Floating Technical HUD Markers */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5 z-10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#555A61]">
            SIGNAL CORE // V3.8-DEF
          </span>
        </div>
        <div className="font-mono-tech text-[9px] text-[#08090A]/60 flex items-center gap-3">
          <span>LATENCY: &lt;10ms</span>
          <span>MODE: {isCleanSignal ? 'CLEAN_OUTPUT' : 'ADAPTIVE_ANALYSIS'}</span>
        </div>
      </div>

      {/* Floating Micro Coordinates HUD */}
      <div className="absolute bottom-4 right-4 pointer-events-none flex flex-col items-end gap-1 z-10 font-mono-tech text-[9px] text-[#555A61]/70">
        <div>ORBITAL VELOCITY: 0.15 rad/s</div>
        <div>SPECTRAL PASS: 20Hz - 12kHz</div>
        <div className="text-[#00A878] font-medium">STATUS: READY / EDGE OPTIMIZED</div>
      </div>

      {/* Interactive HUD Selector for pipeline inspection */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-black/10 shadow-xs">
        {(['INPUT', 'DNN', 'NLMS', 'OUTPUT'] as const).map((stage) => (
          <button
            key={stage}
            onClick={() => setActiveHud(stage)}
            className={`px-2 py-0.5 rounded-full text-[9px] font-mono-tech transition-colors ${
              activeHud === stage
                ? 'bg-[#08090A] text-white'
                : 'text-[#555A61] hover:text-[#08090A]'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>
    </div>
  );
};
