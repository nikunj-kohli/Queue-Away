import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';

// Simple static Stickman doodle
function Stickman({ x, y, z, scale = 1, color = '#00e6e6', opacity = 0.5 }) {
  // Render static stickman doodle
  return (
    <group position={[x, y, z]}>
      {/* Head */}
      <Sphere args={[0.25 * scale, 16, 16]} position={[0, 0.5 * scale, 0]}>
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </Sphere>
      {/* Body */}
      <Line points={[[0, 0.25 * scale, 0], [0, -0.35 * scale, 0]]} color={color} lineWidth={2} />
      {/* Arms */}
      <Line points={[[-0.18 * scale, 0.12 * scale, 0], [0, 0, 0], [0.18 * scale, 0.12 * scale, 0]]} color={color} lineWidth={2} />
      {/* Legs */}
      <Line points={[[0, -0.35 * scale, 0], [-0.15 * scale, -0.7 * scale, 0]]} color={color} lineWidth={2} />
      <Line points={[[0, -0.35 * scale, 0], [0.15 * scale, -0.7 * scale, 0]]} color={color} lineWidth={2} />
    </group>
  );
}

function QueueRow({ y, z, stickmenInQueue, horizontalSpread, queueColor, opacity }) {
  const stickmen = [];
  for (let i = 0; i < stickmenInQueue; i++) {
    const x = -horizontalSpread / 2 + i * (horizontalSpread / (stickmenInQueue - 1));
    stickmen.push(
      <Stickman key={i} x={x} y={y} z={z} scale={1.4} color={queueColor} opacity={opacity} />
    );
  }
  return <>{stickmen}</>;
}

export default function Queue3DHorizontalBackground() {
  // No 3D background or stickmen
  return null;
}

