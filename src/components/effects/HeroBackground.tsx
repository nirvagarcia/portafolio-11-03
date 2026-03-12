'use client';

import * as React from 'react';
import { motion } from 'motion/react';

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />

      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-glow-primary/30 blur-[120px]"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute right-1/4 top-1/3 h-[32rem] w-[32rem] rounded-full bg-glow-secondary/25 blur-[120px]"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 h-80 w-80 rounded-full bg-glow-primary/20 blur-[100px]"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={{
          x: [0, -35, 0],
          y: [0, -25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute right-1/3 top-10 h-64 w-64 rounded-full bg-glow-secondary/15 blur-[80px]"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={{
          x: [0, 25, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--glow-primary)) 0.5px, transparent 0.5px),
                           linear-gradient(90deg, hsl(var(--glow-primary)) 0.5px, transparent 0.5px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="bg-gradient-radial absolute inset-0 from-transparent via-background/30 to-background" />
    </div>
  );
}
