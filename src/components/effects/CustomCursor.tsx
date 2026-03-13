'use client';

import * as React from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = React.useState(false);

  React.useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a, button') !== null
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-glow-primary/50 mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: -16,
          y: -16,
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.8 : 0.6,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      <motion.div
        className="pointer-events-none fixed z-[9999] h-1.5 w-1.5 rounded-full bg-glow-primary mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: -3,
          y: -3,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.1,
        }}
      />

      {isPointer && (
        <>
          <motion.div
            className="pointer-events-none fixed z-[9999] h-[1px] w-3 bg-glow-primary/40 mix-blend-difference"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              x: 12,
              y: -0.5,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          />
          <motion.div
            className="pointer-events-none fixed z-[9999] h-3 w-[1px] bg-glow-primary/40 mix-blend-difference"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              x: -0.5,
              y: 12,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          />
        </>
      )}
    </>
  );
}
