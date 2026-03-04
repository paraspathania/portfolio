import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable element
            const target = e.target;
            setIsHovering(
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            );
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            backgroundColor: "rgba(34, 211, 238, 0.5)",
            border: "2px solid rgba(34, 211, 238, 0)",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-cyan-500/30 rounded-full pointer-events-none z-[9999] border border-cyan-400 backdrop-blur-[1px]"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }} // Smooth trailing
        />
    );
};

export default Cursor;
