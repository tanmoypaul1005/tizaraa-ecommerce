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

// Product Image as 3D Rotating Card with depth
function ProductImageCard({ imageUrl }: { imageUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.anisotropy = 16; // Better texture quality
        setTexture(loadedTexture);
      },
      undefined,
      (error) => console.error('Error loading texture:', error)
    );
  }, [imageUrl]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003; // Slower, more elegant rotation
    }
  });

  if (!texture) {
    return (
      <RoundedBox args={[3.2, 4, 0.15]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#e5e7eb" />
      </RoundedBox>
    );
  }

  return (
    <group ref={groupRef}>
      {/* Front face with product image */}
      <mesh castShadow receiveShadow position={[0, 0, 0.08]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>
      
      {/* Back face - white */}
      <mesh castShadow receiveShadow position={[0, 0, -0.08]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Card edges for depth */}
      {/* Top edge */}
      <mesh castShadow receiveShadow position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 0.16]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
      </mesh>
      
      {/* Bottom edge */}
      <mesh castShadow receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 0.16]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
      </mesh>
      
      {/* Left edge */}
      <mesh castShadow receiveShadow position={[-1.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.16, 4]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
      </mesh>
      
      {/* Right edge */}
      <mesh castShadow receiveShadow position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.16, 4]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
      </mesh>
    </group>
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
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        {/* Enhanced Lighting for realism */}
        <ambientLight intensity={0.3} />
        
        {/* Main key light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light */}
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.4}
          color="#b4d4ff"
        />
        
        {/* Rim light for depth */}
        <spotLight 
          position={[0, 5, -8]} 
          intensity={0.5} 
          angle={0.6}
          penumbra={0.5}
          color="#ffd6a5"
        />
        
        {/* Accent lights */}
        <pointLight position={[3, -2, 3]} intensity={0.3} color="#ff6b9d" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#4a90e2" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingBox />}>
          <ProductImageCard imageUrl={productImage} />
          <Environment preset="studio" environmentIntensity={0.5} />
        </Suspense>

        {/* Realistic ground with reflection */}
        <mesh 
          receiveShadow 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -2.5, 0]}
        >
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Enhanced Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
