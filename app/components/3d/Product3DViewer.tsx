'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
  color?: string;
  material?: string;
  productType?: 'tshirt' | 'watch' | 'phone-case' | 'mug' | 'hoodie' | 'bag' | 'default';
  autoRotate?: boolean;
  productName?: string;
  productImage?: string;
}

// T-Shirt Model
function TShirtModel({ color, materialProps }: { color: string; materialProps: any }) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Left Sleeve */}
      <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.8, 1, 0.3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Right Sleeve */}
      <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.8, 1, 0.3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Watch Model
function WatchModel({ color, materialProps }: { color: string; materialProps: any }) {
  return (
    <group>
      {/* Watch Face */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial {...materialProps} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
        <meshPhysicalMaterial color="#000000" metalness={0.1} roughness={0.1} transparent opacity={0.3} />
      </mesh>
      {/* Band Top */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.4, 1.5, 0.2]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Band Bottom */}
      <mesh position={[0, -1, 0]} castShadow>
        <boxGeometry args={[0.4, 1.5, 0.2]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Phone Case Model
function PhoneCaseModel({ color, materialProps }: { color: string; materialProps: any }) {
  return (
    <group>
      <RoundedBox args={[1.5, 3, 0.3]} radius={0.15} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial {...materialProps} />
      </RoundedBox>
      {/* Camera cutout */}
      <mesh position={[-0.4, 1.2, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Mug Model
function MugModel({ color, materialProps }: { color: string; materialProps: any }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.6, 1.8, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Hoodie Model
function HoodieModel({ color, materialProps }: { color: string; materialProps: any }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.8, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Hood */}
      <mesh position={[0, 1.6, 0.2]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.6]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Pocket */}
      <mesh position={[0, -0.5, 0.25]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Left Sleeve */}
      <mesh position={[-1.3, 0.3, 0]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.9, 1.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Right Sleeve */}
      <mesh position={[1.3, 0.3, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.9, 1.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Bag Model
function BagModel({ color, materialProps }: { color: string; materialProps: any }) {
  return (
    <group>
      {/* Main Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2.2, 0.8]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Flap */}
      <mesh position={[0, 1.2, 0.1]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.4, 0.8]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.5, 1.5, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.5, 1.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Product Image as 3D Rotating Card
function ProductImageCard({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture
  React.useEffect(() => {
    if (imageUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(
        imageUrl,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
        }
      );
    }
  }, [imageUrl]);

  useFrame((state) => {
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

// 3D Product Model Component
function ProductModel({ color = '#3b82f6', material = 'standard', productType = 'default', productName = '', productImage }: Product3DViewerProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const materialProps = {
    color,
    roughness: material === 'metal' ? 0.2 : material === 'wood' ? 0.8 : material === 'leather' ? 0.4 : 0.5,
    metalness: material === 'metal' ? 0.9 : material === 'wood' ? 0.1 : material === 'leather' ? 0.2 : 0.3,
  };

  // Auto-detect product type from name if not specified
  let detectedType = productType;
  if (productType === 'default' && productName) {
    const nameLower = productName.toLowerCase();
    if (nameLower.includes('t-shirt') || nameLower.includes('tshirt')) detectedType = 'tshirt';
    else if (nameLower.includes('watch')) detectedType = 'watch';
    else if (nameLower.includes('phone') || nameLower.includes('case')) detectedType = 'phone-case';
    else if (nameLower.includes('mug') || nameLower.includes('cup') || nameLower.includes('bottle') || nameLower.includes('tumbler')) detectedType = 'mug';
    else if (nameLower.includes('hoodie') || nameLower.includes('sweatshirt')) detectedType = 'hoodie';
    else if (nameLower.includes('bag') || nameLower.includes('backpack') || nameLower.includes('tote')) detectedType = 'bag';
  }

  // If product image is provided, show rotating image card instead of 3D model
  if (productImage) {
    return <ProductImageCard imageUrl={productImage} />;
  }

  return (
    <group ref={meshRef}>
      {detectedType === 'tshirt' && <TShirtModel color={color} materialProps={materialProps} />}
      {detectedType === 'watch' && <WatchModel color={color} materialProps={materialProps} />}
      {detectedType === 'phone-case' && <PhoneCaseModel color={color} materialProps={materialProps} />}
      {detectedType === 'mug' && <MugModel color={color} materialProps={materialProps} />}
      {detectedType === 'hoodie' && <HoodieModel color={color} materialProps={materialProps} />}
      {detectedType === 'bag' && <BagModel color={color} materialProps={materialProps} />}
      {detectedType === 'default' && (
        <RoundedBox args={[2, 2, 2]} radius={0.2} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial {...materialProps} />
        </RoundedBox>
      )}
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
  color = '#3b82f6',
  material = 'standard',
  productType = 'default',
  autoRotate = true,
  productName = '',
  productImage,
}: Product3DViewerProps) {
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
          <ProductModel 
            color={color} 
            material={material} 
            productType={productType}
            productName={productName}
            productImage={productImage}
          />
          <Environment preset="city" />
        </Suspense>

        {/* Ground Plane */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        {/* Controls - Allow rotation and zoom */}
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
