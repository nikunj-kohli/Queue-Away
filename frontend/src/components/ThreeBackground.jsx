import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = ({ children }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#23272f");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.border = "2px solid red"; // Debug border
    renderer.domElement.style.background = "#23272f"; // Fallback background
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.zIndex = -10;
    rendererRef.current = renderer;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      console.log('Three.js canvas mounted');
    } else {
      console.error('mountRef.current is null!');
    }

    // Responsive
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- QUEUE ANIMATION ---
    // Parameters
    const NUM_QUEUES = 6;
    const PEOPLE_PER_QUEUE = 8;
    const QUEUE_SPACING_X = 18;
    const QUEUE_SPACING_Y = 8;
    const PERSON_RADIUS = 1.2;
    const QUEUE_LENGTH = PEOPLE_PER_QUEUE * (PERSON_RADIUS * 2 + 0.7);
    const QUEUE_START_X = -((NUM_QUEUES - 1) * QUEUE_SPACING_X) / 2;
    const QUEUE_START_Y = 0;
    const QUEUE_DEPTH = 0;

    // Store queues as arrays of meshes
    const queues = [];
    const personGeometry = new THREE.SphereGeometry(PERSON_RADIUS, 24, 24);
    const colors = [0x6ec1e4, 0xf1c40f, 0xe17055, 0x00b894, 0xa29bfe, 0xfd79a8];

    for (let q = 0; q < NUM_QUEUES; q++) {
      const queueMeshes = [];
      for (let p = 0; p < PEOPLE_PER_QUEUE; p++) {
        const mat = new THREE.MeshStandardMaterial({ color: colors[q % colors.length] });
        const mesh = new THREE.Mesh(personGeometry, mat);
        mesh.position.x = QUEUE_START_X + q * QUEUE_SPACING_X;
        mesh.position.y = QUEUE_START_Y - p * (PERSON_RADIUS * 2 + 0.7);
        mesh.position.z = QUEUE_DEPTH;
        scene.add(mesh);
        queueMeshes.push(mesh);
      }
      queues.push(queueMeshes);
    }

    // Animation state
    let queueOffsets = Array(NUM_QUEUES).fill(0);
    let queueSpeeds = Array(NUM_QUEUES).fill(0.015);
    let lastShuffle = 0;

    // --- INTERACTIVITY ---
    const shuffleQueues = () => {
      // On click or move, shuffle colors and randomize speed
      for (let q = 0; q < NUM_QUEUES; q++) {
        for (let mesh of queues[q]) {
          mesh.material.color.setHex(colors[Math.floor(Math.random() * colors.length)]);
        }
        queueSpeeds[q] = 0.01 + Math.random() * 0.03;
      }
      lastShuffle = Date.now();
    };
    window.addEventListener('click', shuffleQueues);
    window.addEventListener('mousemove', (e) => {
      if (Date.now() - lastShuffle > 500) {
        shuffleQueues();
      }
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x6ec1e4, 1.5, 200);
    pointLight.position.set(0, 0, 80);
    scene.add(pointLight);

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    const animate = () => {
      // Animate each queue: move people forward, loop front to back
      for (let q = 0; q < NUM_QUEUES; q++) {
        queueOffsets[q] += queueSpeeds[q];
        if (queueOffsets[q] >= PERSON_RADIUS * 2 + 0.7) {
          // Move front person to back
          const mesh = queues[q].shift();
          queues[q].push(mesh);
          queueOffsets[q] = 0;
        }
        for (let p = 0; p < PEOPLE_PER_QUEUE; p++) {
          const mesh = queues[q][p];
          mesh.position.y = QUEUE_START_Y - ((p * (PERSON_RADIUS * 2 + 0.7)) - queueOffsets[q]);
        }
      }
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('click', shuffleQueues);
      window.removeEventListener('mousemove', shuffleQueues);
      renderer.dispose();
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Remove all children from scene
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        background: "#23272f"
      }}
    >
      {children}
    </div>
  );
};

export default ThreeBackground;
