'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { BentoProjectCard } from '@/components/portfolio/BentoProjectCard';
import { projects } from '@/shared/data/projects';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function AllProjectsClient() {
  const t = useTranslations('projects');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([]);

  const allTechs = React.useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => techs.add(tag));
    });
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(project.description).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTechs.length === 0 || selectedTechs.every((tech) => project.tags.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs, t]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTechs([]);
  };

  const hasActiveFilters = searchQuery !== '' || selectedTechs.length > 0;

  return (
    <div className="min-h-screen pt-24">
      <Section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 space-y-6"
          >
            <h1 className="text-4xl font-light lg:text-5xl">
              {t('allProjects')}{' '}
              <span className="text-lg font-extralight text-muted-foreground/60 lg:text-xl">
                ({filteredProjects.length})
              </span>
            </h1>

            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('filterByName')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-surface px-12 py-3 text-foreground placeholder:text-muted-foreground focus:border-glow-primary focus:outline-none focus:ring-2 focus:ring-glow-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{t('filterByTech')}:</p>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                    {t('clearFilters')}
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTechs.map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTechs.includes(tech) ? 'glow' : 'secondary'}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => toggleTech(tech)}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:auto-rows-[320px] md:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-4 lg:gap-6"
              >
                {filteredProjects.map((project, index) => {
                  let className = '';
                  let size: 'large' | 'medium' = 'medium';

                  const posInPattern = index % 5;

                  if (posInPattern === 0) {
                    className = 'md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2';
                    size = 'large';
                  }

                  return (
                    <div key={project.id} className={className}>
                      <BentoProjectCard project={project} index={index} size={size} />
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t('noResults')}</h3>
                <p className="mb-6 text-muted-foreground">{t('tryAdjusting')}</p>
                <Button onClick={clearFilters}>{t('clearFilters')}</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}
