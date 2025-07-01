import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current) {
      effectRef.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x6ec1e4, // Cyan blue for dots/lines
        backgroundColor: 0x23272f, // Classic charcoal dark
        points: 12.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
        showLines: true,
        // You can tweak these for a subtler or more dramatic effect
      });
    }
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', minHeight: '100vh', zIndex: -10 }} ref={vantaRef} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default VantaBackground;
