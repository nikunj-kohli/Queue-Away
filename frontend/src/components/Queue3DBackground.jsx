import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';

// Generates a stickman doodle at a given position
function Stickman({ position = [0, 0, 0], scale = 1, color = "#00e6e6", phase = 0, opacity = 0.5 }) {
  // useFrame must be used inside Canvas, so this is safe
  const group = useRef();
  // No animation: do not use useFrame, keep stickman at static position


  return (
    <group ref={group} position={position} scale={[scale, scale, scale]}>
      <Sphere args={[0.09, 16, 16]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </Sphere>
      <Line points={[[0, 0.36, 0], [0, -0.2, 0]]} color={color} lineWidth={2} transparent opacity={opacity} />
      <Line points={[[-0.16, 0.18, 0], [0, 0.18, 0], [0.16, 0.18, 0]]} color={color} lineWidth={2} transparent opacity={opacity} />
      <Line points={[[0, -0.2, 0], [-0.1, -0.45, 0]]} color={color} lineWidth={2} transparent opacity={opacity} />
      <Line points={[[0, -0.2, 0], [0.1, -0.45, 0]]} color={color} lineWidth={2} transparent opacity={opacity} />
    </group>
  );
}

function Queue3DBackground() {
  // Generate queue data outside of Canvas
  // Animate queue progress
  const queueCount = 14;
  const figuresPerQueue = 18;
  const queueGap = 1.0; // Increase gap between queues
  const queueLength = 6.0; // Vertical length of each queue
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    let animation;
    const animate = () => {
      setTime(performance.now() / 1000);
      animation = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animation);
  }, []);

  const queues = useMemo(() => {
    const arr = [];
    for (let i = 0; i < queueCount; i++) {
      for (let j = 0; j < figuresPerQueue; j++) {
        arr.push({
          queueIndex: i,
          figureIndex: j,
          x: -7 + i * queueGap, // wider gap between queues
          z: -8 + Math.random() * 2,
          scale: 0.65 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return arr;
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -20, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 14], fov: 60 }} style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 6, 4]} intensity={0.7} />
        {queues.map((q, i) => {
          // Each stickman wiggles in place
          const y = -queueLength / 2 + (q.figureIndex * queueLength) / (figuresPerQueue - 1);
          return (
            <Stickman
              key={i}
              position={[q.x, y, q.z]}
              scale={q.scale}
              color="#00e6e6"
              phase={q.phase}
              opacity={0.5}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

export default Queue3DBackground;
