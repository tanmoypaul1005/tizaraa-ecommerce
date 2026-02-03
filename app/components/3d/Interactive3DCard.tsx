'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Interactive3DCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FloatingBox({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <RoundedBox ref={meshRef} args={[1, 1, 1]} radius={0.1} smoothness={4}>
      <meshStandardMaterial
        color={isHovered ? '#3b82f6' : '#8b5cf6'}
        roughness={0.3}
        metalness={0.6}
      />
    </RoundedBox>
  );
}

export default function Interactive3DCard({ icon, title, description }: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingBox isHovered={isHovered} />
        </Canvas>
      </div>

      <div className="relative z-10">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

