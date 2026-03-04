import React, { useEffect, useRef } from 'react';

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let lastTime = 0;
        const FPS = 30; // cap to 30fps — plenty smooth for ambient stars
        const INTERVAL = 1000 / FPS;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const AURORA_COLORS = [
            [148, 246, 228],  // aurora teal
            [167, 139, 250],  // aurora violet
            [110, 231, 183],  // aurora green
            [255, 255, 255],  // white
            [255, 255, 255],  // white (weighted more)
        ];

        const STAR_COUNT = 120;
        const stars = Array.from({ length: STAR_COUNT }, () => {
            const col = AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)];
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.1 + 0.2,
                speed: Math.random() * 0.1 + 0.02,
                opacity: Math.random() * 0.45 + 0.25,
                twinkleSpeed: Math.random() * 0.008 + 0.004,
                twinklePhase: Math.random() * Math.PI * 2,
                col,
            };
        });

        const animate = (now) => {
            animId = requestAnimationFrame(animate);
            if (now - lastTime < INTERVAL) return; // throttle
            lastTime = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                s.twinklePhase += s.twinkleSpeed;
                const alpha = s.opacity * (0.7 + 0.3 * Math.sin(s.twinklePhase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${s.col[0]}, ${s.col[1]}, ${s.col[2]}, ${alpha})`;
                ctx.fill();
                s.y -= s.speed;
                if (s.y < -5) {
                    s.y = canvas.height + 5;
                    s.x = Math.random() * canvas.width;
                }
            });
        };
        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="star-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default StarField;
