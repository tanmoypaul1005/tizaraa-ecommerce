'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
  productImage?: string;
  productName?: string;
  autoRotate?: boolean;
}

// Product Image as 3D Rotating Card
function ProductImageCard({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      setTexture,
      undefined,
      (error) => console.error('Error loading texture:', error)
    );
  }, [imageUrl]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  if (!texture) {
    return (
      <RoundedBox args={[3, 3, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#e5e7eb" />
      </RoundedBox>
    );
  }

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

// Loading Placeholder
function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#e5e7eb" wireframe />
    </mesh>
  );
}

export default function Product3DViewer({
  autoRotate = true,
  productImage,
}: Product3DViewerProps) {
  if (!productImage) return null;

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight position={[-10, 10, -5]} intensity={0.3} />
        <spotLight position={[10, -10, 5]} intensity={0.2} color="#fbbf24" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingBox />}>
          <ProductImageCard imageUrl={productImage} />
          <Environment preset="city" />
        </Suspense>

        {/* Ground Plane */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        {/* Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
