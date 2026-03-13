'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FloatingCode } from '@/components/effects/FloatingCode';

export function HeroSection() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/nirvana-garcia/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/nirvagarcia', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent pb-0"
    >
      <FloatingCode />

      <Container className="relative z-10 flex flex-1 items-center">
        <div className="flex w-full flex-col items-center justify-center pt-12">
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
                className="group flex items-center gap-2 rounded-lg border border-border/50 bg-surface/50 px-6 py-3 font-mono text-sm backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface"
              >
                <span className="text-muted-foreground">$</span>
                <span>./{t('projects')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/about`}
                className="group flex items-center gap-2 rounded-lg border border-border/50 bg-surface/50 px-6 py-3 font-mono text-sm backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface"
              >
                <span className="text-muted-foreground">$</span>
                <span>cat ABOUTME.md</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="group flex items-center gap-2 rounded-lg border border-border/50 bg-surface/50 px-6 py-3 font-mono text-sm backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface"
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
        className="relative z-20 mb-8 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5 transition-colors group-hover:text-glow-primary" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
