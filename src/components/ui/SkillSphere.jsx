import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Text } from '@react-three/drei';

/* ── Fibonacci sphere point distribution ── */
function fibonacciSphere(count, radius) {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;
        return [radius * r * Math.cos(theta), radius * y, radius * r * Math.sin(theta)];
    });
}

/* ── Wireframe core sphere ── */
function CoreSphere() {
    const ref = useRef();
    useFrame((state) => { ref.current.rotation.y = state.clock.elapsedTime * 0.08; });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[1.6, 14, 14]} />
            <meshStandardMaterial color="#0f172a" emissive="#0891b2" emissiveIntensity={0.15} transparent opacity={0.2} wireframe />
        </mesh>
    );
}

/* ── Decorative spinning ring ── */
function RingDecor({ radius, axis = 'y' }) {
    const ref = useRef();
    useFrame((state) => { ref.current.rotation[axis] = state.clock.elapsedTime * 0.15; });
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.012, 6, 80]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} transparent opacity={0.5} />
        </mesh>
    );
}

/* ── Single skill node: GPU sprite icon + GPU text label ── */
function SkillNode({ skill, position }) {
    // useTexture caches — each URL loads once across all nodes
    const texture = useTexture(skill.icon);

    return (
        <group position={position}>
            {/* Glowing cyan dot */}
            <mesh>
                <sphereGeometry args={[0.07, 6, 6]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.2} />
            </mesh>

            {/* Icon — GPU Sprite, zero DOM overhead */}
            <sprite scale={[0.32, 0.32, 1]} position={[0, 0, 0]}>
                <spriteMaterial
                    map={texture}
                    transparent
                    depthWrite={false}
                // invert dark icons (Express, GitHub) by tinting white is default; they show fine
                />
            </sprite>

            {/* Name label — GPU Text via troika-three-text, no DOM */}
            <Text
                position={[0, -0.28, 0]}
                fontSize={0.11}
                color="#94a3b8"
                anchorX="center"
                anchorY="top"
                depthOffset={-1}
                renderOrder={1}
            >
                {skill.name}
            </Text>
        </group>
    );
}

/* ── Fallback spheres while textures load ── */
function SkillNodeFallback({ position }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color="#334155" emissive="#1e293b" />
        </mesh>
    );
}

/* ── Wrapper that shows fallback until textures are ready  ── */
function SkillNodeWithSuspense({ skill, position }) {
    return (
        <Suspense fallback={<SkillNodeFallback position={position} />}>
            <SkillNode skill={skill} position={position} />
        </Suspense>
    );
}

/* ── Globe auto-rotates via OrbitControls autoRotate ──
   This way the canvas doesn't need a manual useFrame that forces full re-renders;
   OrbitControls.autoRotate calls invalidate() only when the angle changes. ── */
function GlobeScene({ skills }) {
    const positions = useMemo(() => fibonacciSphere(skills.length, 2.1), [skills.length]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[4, 4, 4]} intensity={1.2} color="#22d3ee" />
            <pointLight position={[-4, -4, 4]} intensity={0.5} color="#f97316" />

            <RingDecor radius={2.5} axis="y" />
            <RingDecor radius={2.7} axis="x" />
            <CoreSphere />

            {skills.map((skill, i) => (
                <SkillNodeWithSuspense key={skill.name} skill={skill} position={positions[i]} />
            ))}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.2}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI * 0.15}
                maxPolarAngle={Math.PI * 0.85}
            />
        </>
    );
}

/* ── Exported component ── */
const SkillSphere = ({ skills }) => (
    <div style={{ width: '100%', height: 520, cursor: 'grab' }}>
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            dpr={[1, 1.5]}
            frameloop="demand"        /* OrbitControls.autoRotate drives invalidation — less wasteful than 'always' */
            gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
            <GlobeScene skills={skills} />
        </Canvas>
    </div>
);

export default SkillSphere;
