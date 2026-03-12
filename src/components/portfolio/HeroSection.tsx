'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ArrowDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { HeroBackground } from '@/components/effects/HeroBackground';
import { FloatingCode } from '@/components/effects/FloatingCode';
import { ProfileImage } from './ProfileImage';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      <FloatingCode />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-12 py-20 lg:flex-row lg:gap-20 lg:py-0">
          <motion.div
            className="flex-1 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="glow" className="px-4 py-2 text-sm">
                {t('name')} | {t('role')}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-gradient-primary">{t('headline')}</span>
            </motion.h1>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ProfileImage />
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.button
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative flex cursor-pointer flex-col items-center gap-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-glow-primary/20 to-glow-secondary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative">
            <ArrowDown
              className="h-7 w-7 text-glow-primary transition-colors duration-300 group-hover:text-glow-secondary sm:h-8 sm:w-8"
              strokeWidth={2.5}
            />
          </div>

          <div className="h-8 w-[2px] bg-gradient-to-b from-glow-primary/50 via-glow-secondary/30 to-transparent" />
        </motion.button>
      </motion.div>
    </section>
  );
}
