'use client';

import * as React from 'react';
import { motion } from 'motion/react';

export function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      <motion.div
        className="absolute left-[10%] top-[8%] h-[500px] w-[500px] rounded-full bg-glow-primary/30 blur-[120px]"
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
        className="absolute right-[15%] top-[15%] h-[600px] w-[600px] rounded-full bg-glow-secondary/25 blur-[130px]"
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
        className="bg-glow-secondary/22 absolute left-[5%] top-[40%] h-[480px] w-[480px] rounded-full blur-[115px]"
        animate={{
          x: [0, 45, 0],
          y: [0, -35, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
      />

      <motion.div
        className="bg-glow-primary/24 absolute right-[10%] top-[45%] h-[520px] w-[520px] rounded-full blur-[125px]"
        animate={{
          x: [0, -38, 0],
          y: [0, 42, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: 'linear',
          delay: 3.5,
        }}
      />

      <motion.div
        className="absolute left-[60%] top-[65%] h-[450px] w-[450px] rounded-full bg-glow-primary/20 blur-[110px]"
        animate={{
          x: [0, -35, 0],
          y: [0, -25, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />

      <motion.div
        className="bg-glow-secondary/18 absolute left-[20%] top-[72%] h-[430px] w-[430px] rounded-full blur-[105px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: 'linear',
          delay: 6,
        }}
      />

      <motion.div
        className="bg-glow-primary/16 absolute right-[25%] top-[88%] h-[380px] w-[380px] rounded-full blur-[95px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 7,
        }}
      />

      <motion.div
        className="bg-glow-secondary/17 absolute left-[45%] top-[82%] h-[400px] w-[400px] rounded-full blur-[100px]"
        animate={{
          x: [0, 32, 0],
          y: [0, -22, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 8,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--glow-primary)) 0.5px, transparent 0.5px),
                           linear-gradient(90deg, hsl(var(--glow-primary)) 0.5px, transparent 0.5px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/40" />
    </div>
  );
}
