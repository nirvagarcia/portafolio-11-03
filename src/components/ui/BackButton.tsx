'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();
  const t = useTranslations('common');

  return (
    <motion.button
      onClick={() => router.back()}
      className="group fixed left-4 top-24 z-40 flex items-center gap-2 rounded-full border border-border/50 bg-surface/80 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface sm:left-6 sm:top-24 lg:left-12 lg:top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('back')}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span className="hidden sm:inline">{t('back')}</span>
    </motion.button>
  );
}
