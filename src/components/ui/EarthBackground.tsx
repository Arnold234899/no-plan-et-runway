
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
      earthRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#4A90E2"
        metalness={0.3}
        roughness={0.4}
        emissive="#1e40af"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const FloatingText = ({ text, position, color, size = 0.5 }: {
  text: string;
  position: [number, number, number];
  color: string;
  size?: number;
}) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      textRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.2;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.5;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={size}
        height={0.1}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Text3D>
    </group>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60A5FA" transparent opacity={0.6} />
    </points>
  );
};

export const EarthBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade={true}
        />
        
        <Earth />
        <Particles />
        
        <FloatingText
          text="NO"
          position={[-4, 2, 0]}
          color="#ffffff"
          size={0.8}
        />
        <FloatingText
          text="PLAN-ET"
          position={[0, 0, 2]}
          color="#3B82F6"
          size={1.2}
        />
        <FloatingText
          text="B"
          position={[4, -2, 1]}
          color="#60A5FA"
          size={1.5}
        />
        
        <FloatingText
          text="🌍"
          position={[-2, -3, 3]}
          color="#10B981"
          size={0.6}
        />
        <FloatingText
          text="♻️"
          position={[3, 3, 0]}
          color="#34D399"
          size={0.5}
        />
        <FloatingText
          text="🌱"
          position={[-3, 1, 4]}
          color="#059669"
          size={0.4}
        />
        
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
