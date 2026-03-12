'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BentoProjectCard } from './BentoProjectCard';
import { projects } from '@/shared/data/projects';
import { Section } from '@/components/ui/Section';

export function ProjectsShowcase() {
  const t = useTranslations('projects');
  const featured = projects.filter((p) => p.featured);

  return (
    <Section id="projects" className="py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 space-y-2"
        >
          <h2 className="text-3xl font-light lg:text-3xl">{t('featuredProjects')}</h2>
        </motion.div>

        <div className="grid auto-rows-[380px] grid-cols-1 gap-8 sm:auto-rows-[400px] sm:gap-6 md:grid-cols-2 lg:auto-rows-[420px] lg:grid-cols-4">
          {featured.map((project, index) => {
            let className = '';
            let size: 'large' | 'medium' = 'medium';

            if (index === 0) {
              className = 'md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2';
              size = 'large';
            } else if (index === 1) {
              className = 'md:col-span-2 lg:col-span-2';
            }

            return (
              <div key={project.id} className={className}>
                <BentoProjectCard project={project} index={index} size={size} />
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-glow-primary"
          >
            <span className="text-sm font-medium">{t('viewAll')}</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
