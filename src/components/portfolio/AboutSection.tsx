'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { journeyData } from '@/shared/data/journey';
import { Download, Briefcase, GraduationCap, Calendar } from 'lucide-react';

export function AboutSection() {
  const t = useTranslations('about');
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadCV = () => {
    window.open('/documents/Nirvana García Vásquez - CV 2026 (ES).pdf', '_blank');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Section className="relative -mt-20 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                      <Image
                        src="/images/nirvana-hero.png"
                        alt="Nirvana Garcia"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{t('title')}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Nirvana Garcia</p>
                  </div>

                  <p className="text-center text-sm leading-relaxed text-muted-foreground">
                    {t('description')}
                  </p>

                  <div className="border-t border-border/50" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <span className="text-2xl">🇵🇪</span>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">Lima, Peru</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="mb-1 text-xs text-muted-foreground">Local Time</p>
                      <p className="font-mono text-xl font-semibold tabular-nums">
                        {formatTime(currentTime)}
                      </p>
                      <p className="mt-0.5 text-xs capitalize text-muted-foreground">
                        {formatDate(currentTime)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </div>
                        <span className="text-sm font-medium">{t('availabilityStatus')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCV}
                    className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      {t('downloadCV')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">{t('journeyTitle')}</h2>
              <p className="text-muted-foreground">{t('journeySubtitle')}</p>
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-6 top-0 w-px bg-border" />

              <div className="space-y-6">
                {journeyData.map((item, index) => {
                  const Icon = item.type === 'work' ? Briefcase : GraduationCap;
                  const isPresentRole = item.endDate === 'present';

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="flex gap-6">
                        <div className="relative flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                        </div>

                        <div className="bg-card flex-1 rounded-xl border border-border p-5">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold">{item.organization}</h3>
                                <p className="mt-1 text-muted-foreground">
                                  {item.role || item.degree}
                                </p>
                              </div>
                              {isPresentRole && (
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                  {t('current')}
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                  {item.startDate} - {isPresentRole ? t('present') : item.endDate}
                                </span>
                              </div>
                              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                {item.type === 'work' ? t('work') : t('education')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
