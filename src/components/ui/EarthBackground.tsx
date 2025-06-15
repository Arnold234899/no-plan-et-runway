import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const Earth = () => {
  const earthGroupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (earthGroupRef.current) {
      // Slower, more majestic rotation
      earthGroupRef.current.rotation.y += 0.002;
      // Gentle bobbing motion
      earthGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={earthGroupRef} position={[0, 0, -5]}>
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#4A90E2"
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>
      {/* Atmosphere Effect */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#87CEEB"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const p = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Move particles to simulate a gentle meteor shower
        p[i3 + 1] -= 0.05 * (Math.random() * 0.5 + 0.2);
        p[i3] += 0.005 * (Math.random() - 0.5);

        // Reset particle to the top when it goes out of view
        if (p[i3 + 1] < -15) {
          p[i3 + 1] = 15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.7} />
    </points>
  );
};

export const EarthBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade={true}
        />
        
        <Earth />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
