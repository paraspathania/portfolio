import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';

/* ── Draggable 3D Shape ── */
function DraggableShape({ position, args, color, wireframe = false, type = 'icosahedron' }) {
    const meshRef = useRef();
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);
    const { size, viewport } = useThree();

    // Velocity for free drift
    const velocity = useRef({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008
    });

    // Simple drag behavior
    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        setDragging(true);
        // Stop drifting while dragging
        velocity.current = { x: 0, y: 0 };
    };

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.target.releasePointerCapture(e.pointerId);
        setDragging(false);
        // Re-inject a slight drift velocity
        velocity.current = {
            x: (Math.random() - 0.5) * 0.015,
            y: (Math.random() - 0.5) * 0.015
        };
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;
        const x = (e.clientX / size.width) * 2 - 1;
        const y = -(e.clientY / size.height) * 2 + 1;

        meshRef.current.position.x = x * viewport.width / 2;
        meshRef.current.position.y = y * viewport.height / 2;
    };

    useFrame((state) => {
        if (!dragging) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.008;

            // Free drift movement
            meshRef.current.position.x += velocity.current.x;
            meshRef.current.position.y += velocity.current.y;

            // Bounce off edges of the 3D viewport
            const margin = 1.5;
            if (Math.abs(meshRef.current.position.x) > viewport.width / 2 + margin) {
                velocity.current.x *= -1;
                meshRef.current.position.x = Math.sign(meshRef.current.position.x) * (viewport.width / 2 + margin);
            }
            if (Math.abs(meshRef.current.position.y) > viewport.height / 2 + margin) {
                velocity.current.y *= -1;
                meshRef.current.position.y = Math.sign(meshRef.current.position.y) * (viewport.height / 2 + margin);
            }
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered || dragging ? 1.1 : 1}
        >
            {type === 'icosahedron' ? (
                <icosahedronGeometry args={args} />
            ) : (
                <octahedronGeometry args={args} />
            )}
            <meshStandardMaterial
                color={color}
                wireframe={wireframe}
                emissive={color}
                emissiveIntensity={hovered || dragging ? 0.8 : 0.4}
                transparent
                opacity={0.8}
            />
        </mesh>
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

    const [isInteracting, setIsInteracting] = useState(false);

    return (
        // Switch pointer-events-auto ONLY when hovering objects
        <div
            ref={ref}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'} ${isInteracting ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    style={{ background: 'transparent' }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                    onPointerMissed={() => setIsInteracting(false)}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#14b8a6" />
                    <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a78bfa" />
                    <StarParticles />

                    <group
                        onPointerOver={() => setIsInteracting(true)}
                        onPointerOut={() => setIsInteracting(false)}
                    >
                        <DraggableShape
                            position={[0, 0, -2]}
                            args={[1.6, 0]}
                            color="#2dd4bf"
                            wireframe
                            type="icosahedron"
                        />
                    </group>

                    <CameraRig />
                </Canvas>
            )}
        </div>
    );
};

export default HeroCanvas;
