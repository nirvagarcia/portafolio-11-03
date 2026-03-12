'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/shared/data/projects';

const PROJECTS_PER_PAGE = 6;

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [direction, setDirection] = React.useState(0);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    }
  };

  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <Section id="projects" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <motion.h2
              className="text-section-title font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('title')}{' '}
              <span className="font-extralight text-muted-foreground/60">({t('subtitle')})</span>
            </motion.h2>
          </div>

          {totalPages > 1 && (
            <motion.div
              className="hidden items-center gap-2 sm:flex"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-all hover:border-glow-primary/50 hover:bg-glow-primary/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={t('previous')}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-10 min-w-[2.5rem] rounded-lg px-3 text-sm font-medium transition-all ${
                      page === currentPage
                        ? 'bg-gradient-to-r from-glow-primary to-glow-secondary text-white'
                        : 'border border-border bg-surface hover:border-glow-primary/50 hover:bg-glow-primary/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-all hover:border-glow-primary/50 hover:bg-glow-primary/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={t('next')}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="hidden sm:block">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="sm:hidden">
          <div className="relative -mx-4 overflow-hidden px-4">
            <div
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
              style={{ scrollPaddingLeft: '1rem' }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-[85vw] flex-shrink-0 snap-center">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`h-1.5 rounded-full transition-all ${
                  index === 0 ? 'w-6 bg-glow-primary' : 'w-1.5 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2 sm:hidden">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={t('previous')}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4">
              <span className="text-sm font-medium text-glow-primary">{currentPage}</span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">{totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={t('next')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
