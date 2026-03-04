import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';

/* ── Floating 3D icosahedron mesh ── */
function FloatingShape() {
    const meshRef = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        meshRef.current.rotation.x = t * 0.12;
        meshRef.current.rotation.y = t * 0.18;
        meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    });
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <mesh ref={meshRef} position={[2.5, 0, -2]}>
                <icosahedronGeometry args={[1.4, 0]} />
                <meshStandardMaterial color="#2dd4bf" wireframe emissive="#0d9488" emissiveIntensity={0.5} />
            </mesh>
        </Float>
    );
}

/* ── Torus ring ── */
function TorusRing() {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.rotation.x = t * 0.3;
        ref.current.rotation.z = t * 0.2;
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
            <mesh ref={ref} position={[-2.8, 1, -3]}>
                <torusGeometry args={[0.7, 0.08, 8, 40]} />
                <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.5} />
            </mesh>
        </Float>
    );
}

/* ── Star field — trimmed to 600 particles ── */
function StarParticles() {
    const count = 600;
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return arr;
    }, []);

    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial color="#99f6e4" size={0.03} sizeAttenuation depthWrite={false} />
        </Points>
    );
}

/* ── Mouse parallax — throttled via lerp only, no setState ── */
function CameraRig() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let ticking = false;
        const handleMove = (e) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
                mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
                ticking = false;
            });
        };
        window.addEventListener('mousemove', handleMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    useFrame(() => {
        camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.04;
        camera.position.y += (mouse.current.y * 0.25 - camera.position.y) * 0.04;
    });
    return null;
}

/* ── Exported canvas wrapper — only renders when visible ── */
const HeroCanvas = () => {
    const [visible, setVisible] = useState(true);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    style={{ background: 'transparent' }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#14b8a6" />
                    <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a78bfa" />
                    <StarParticles />
                    <FloatingShape />
                    <TorusRing />
                    <CameraRig />
                </Canvas>
            )}
        </div>
    );
};

export default HeroCanvas;
