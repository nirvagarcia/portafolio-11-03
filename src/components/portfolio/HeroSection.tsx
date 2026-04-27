'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FloatingCode } from '@/components/effects/FloatingCode';

export function HeroSection() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent pb-0"
    >
      <FloatingCode />

      {/* 3D Character Image - naciendo desde abajo, encima de las letras */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 z-[5]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: 'translateX(-50%)' }}
      >
        <Image
          src="/images/Nirvana-3D-Full.png"
          alt="Nirvana 3D Character"
          width={600}
          height={800}
          className="h-auto max-h-[50vh] w-auto object-contain opacity-40 dark:opacity-30 md:max-h-[70vh]"
          priority
        />
      </motion.div>

      <Container className="relative z-10 flex flex-1 items-center">
        <div className="flex w-full flex-col items-center justify-center px-6 pt-12 sm:px-6">
          <motion.div
            className="flex-1 space-y-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="text-xl font-light text-muted-foreground sm:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('developer')}
            </motion.p>

            <motion.h1
              className="text-6xl font-bold uppercase leading-tight tracking-tight sm:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('name')}
            </motion.h1>

            <motion.div
              className="flex flex-col items-center gap-3 pt-8 sm:flex-row sm:justify-center sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href={`/${locale}/projects`}
                className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-gray-300/60 bg-white/20 px-6 py-3 font-mono text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.3)] backdrop-blur-xl transition-all hover:border-glow-primary/60 hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:hover:bg-black/30"
              >
                <span className="text-muted-foreground">$</span>
                <span>./{t('projects')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/about`}
                className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-gray-300/60 bg-white/20 px-6 py-3 font-mono text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.3)] backdrop-blur-xl transition-all hover:border-glow-primary/60 hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:hover:bg-black/30"
              >
                <span className="text-muted-foreground">$</span>
                <span>cat ABOUTME.md</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-gray-300/60 bg-white/20 px-6 py-3 font-mono text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.3)] backdrop-blur-xl transition-all hover:border-glow-primary/60 hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:hover:bg-black/30"
              >
                <span className="text-muted-foreground">$</span>
                <span>vim CONTACT.md</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="relative z-20 mb-8 flex flex-row items-center justify-center gap-3 px-6 sm:gap-6 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-2 rounded-full border border-[#3b5110]/40 bg-[#3b5110]/15 px-3 py-1.5 backdrop-blur-sm dark:border-lime-500/30 dark:bg-lime-500/10 sm:px-4 sm:py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-[#445a14] dark:bg-lime-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-xs text-[#31470b] dark:text-lime-300">Available</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-1.5 rounded-full border border-border/50 bg-surface/30 px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="text-xs text-muted-foreground">📍 Lima, Peru</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
