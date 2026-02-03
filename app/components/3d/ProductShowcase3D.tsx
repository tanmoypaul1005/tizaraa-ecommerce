'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ProductShowcase3DProps {
  color?: string;
  rotationSpeed?: number;
}

function RotatingProduct({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <RoundedBox ref={meshRef} args={[2, 2, 2]} radius={0.2} smoothness={4} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.6}
      />
    </RoundedBox>
  );
}

export default function ProductShowcase3D({ color = '#3b82f6', rotationSpeed = 1 }: ProductShowcase3DProps) {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <spotLight position={[-10, 10, -5]} intensity={0.3} />

        <RotatingProduct color={color} />
        <Environment preset="warehouse" />

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
