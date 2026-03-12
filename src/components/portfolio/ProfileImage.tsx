'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/Card';

export function ProfileImage() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card variant="glass" className="overflow-hidden p-2">
        <div className="relative aspect-square w-64 overflow-hidden rounded-lg sm:w-80 lg:w-96">
          {isLoading && <div className="absolute inset-0 animate-pulse bg-surface-elevated" />}

          <Image
            src="/images/profile.webp"
            alt="Nirvana Garcia"
            fill
            priority
            className={`object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
            unoptimized={process.env.NODE_ENV === 'development'}
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-glow-primary/10 via-transparent to-glow-secondary/10 mix-blend-overlay" />

          <div className="glow-primary absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 hover:opacity-100" />
        </div>
      </Card>

      <motion.div
        className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-glow-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-glow-secondary/20 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.div>
  );
}
