'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Download, Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

export function AboutSection() {
  const t = useTranslations('about');

  const handleDownloadCV = () => {
    window.open('/documents/Nirvana García Vásquez - CV.pdf', '_blank');
  };

  return (
    <Section className="relative py-12 sm:py-16 lg:py-20">
      <div className="h-full">
        <div className="h-full">
          <div className="h-full overflow-hidden rounded-2xl bg-surface-elevated shadow-2xl ring-1 ring-border/50">
            <div className="flex items-center gap-3 border-b border-border/50 bg-surface/80 px-4 py-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-sm text-muted-foreground">about.sh</span>
            </div>

            <div className="bg-card px-4 pb-4 pt-6">
              <div className="flex flex-col space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                    <Image
                      src="/images/nirvana-hero.png"
                      alt="Nirvana Garcia"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Nirvana Garcia</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t('role')}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="mb-2 text-base font-bold">{t('aboutMe')}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t('description')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Lima, Peru 🇵🇪</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium">{t('availabilityStatus')}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3 border-t border-border/50 pt-4"
                >
                  <h4 className="text-base font-bold">{t('experience')}</h4>

                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="text-sm font-semibold">Laraigo</h5>
                          <p className="text-xs text-muted-foreground">AI & Software Engineer</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {t('current')}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>2023 - {t('present')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold">UPC</h5>
                      <p className="text-xs text-muted-foreground">Software Engineering</p>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>2021 - 2025</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  onClick={handleDownloadCV}
                  className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    {t('downloadCV')}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
