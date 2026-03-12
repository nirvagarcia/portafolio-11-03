'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { TechDetailModal } from './TechDetailModal';
import { stackLayers, getTechById } from '@/shared/data/stack';
import type { Tech } from '@/shared/types/stack';

export function StackSection() {
  const t = useTranslations();
  const [selectedTech, setSelectedTech] = React.useState<Tech | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleTechClick = (techId: string) => {
    const tech = getTechById(techId);
    if (tech) {
      setSelectedTech(tech);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  };

  return (
    <Section id="stack" className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-glow-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-glow-secondary/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-3xl font-light lg:text-4xl">{t('stack.title')}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:text-base">
            {t('stack.subtitle')}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="space-y-16 lg:space-y-20">
            {stackLayers.map((layer, layerIndex) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: layerIndex * 0.15 }}
                className="relative"
              >
                <div className="mb-8 text-center lg:mb-10">
                  <h3 className="text-lg font-semibold text-muted-foreground lg:text-xl">
                    {t(layer.name)}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
                  {layer.techs.map((tech, techIndex) => (
                    <motion.button
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: layerIndex * 0.15 + techIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTechClick(tech.id)}
                      className="hover:bg-surface-hover group relative flex flex-col items-center gap-3 rounded-2xl bg-surface-elevated p-6 ring-1 ring-border/50 transition-all hover:shadow-lg hover:shadow-glow-primary/10 hover:ring-glow-primary/50"
                    >
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-glow-primary/0 to-glow-secondary/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-glow-primary/20 to-glow-secondary/20 ring-2 ring-glow-primary/30 transition-all group-hover:ring-glow-primary/60 lg:h-20 lg:w-20">
                        {tech.icon ? (
                          <span className="text-2xl lg:text-3xl">{tech.icon}</span>
                        ) : (
                          <span className="text-lg font-bold text-glow-primary lg:text-xl">
                            {tech.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-semibold lg:text-base">{tech.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{tech.category}</p>
                      </div>

                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-glow-primary opacity-0 transition-opacity group-hover:opacity-100">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {layerIndex < stackLayers.length - 1 && (
                  <div className="relative mx-auto mt-12 w-px lg:mt-16">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: '80px' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: layerIndex * 0.15 + 0.3 }}
                      className="w-full bg-gradient-to-b from-glow-primary/50 via-glow-secondary/30 to-transparent"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: layerIndex * 0.15 + 0.5 }}
                      className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-glow-primary/50"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground">
              {t('stack.cta')}{' '}
              <span className="font-medium text-glow-primary">{t('stack.clickToExplore')}</span>
            </p>
          </motion.div>
        </div>
      </div>

      <TechDetailModal tech={selectedTech} isOpen={isModalOpen} onClose={handleCloseModal} />
    </Section>
  );
}
