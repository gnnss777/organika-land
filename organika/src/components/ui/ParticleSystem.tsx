"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  color?: string;
  count?: number;
}

export default function ParticleSystem({ color = "#4AFF7A", count = 50000 }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  const { positions, randoms, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 8;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
      
      scales[i] = 0.5 + Math.random() * 1.5;
    }
    
    return { positions, randoms, scales };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 120 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseSpeed: { value: 0 },
    uColor: { value: new THREE.Color(color) },
  }), [color]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    if (material && material.uniforms) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [positions, randoms, scales]);

  const vertexShader = `
    uniform float uTime;
    uniform float uSize;
    uniform vec2 uMouse;
    varying float vAlpha;
    varying float vScale;
    
    attribute vec3 aRandom;
    attribute float aScale;
    
    void main() {
      vec3 pos = position;
      
      float t = uTime * 0.3;
      pos.x += sin(t + aRandom.x * 10.0) * 0.5;
      pos.y += cos(t * 0.7 + aRandom.y * 10.0) * 0.5;
      pos.z += sin(t * 0.5 + aRandom.z * 10.0) * 0.3;
      
      vec2 mousePos = uMouse;
      float mouseDist = distance(pos.xy, mousePos);
      float mouseInfluence = smoothstep(2.0, 0.0, mouseDist) * 0.5;
      
      float scale = aScale * (1.0 + mouseInfluence * 0.5);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = uSize * scale * (300.0 / -mvPosition.z);
      
      vAlpha = 0.6 + mouseInfluence * 0.4;
      vScale = scale;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    varying float vScale;
    
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float dist = length(uv);
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= vAlpha;
      if (alpha < 0.01) discard;
      
      vec3 color = uColor + 0.1 * vScale;
      gl_FragColor = vec4(color, alpha * 0.85);
    }
  `;

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}