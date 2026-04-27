'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import { BentoProjectCard } from '@/components/portfolio/BentoProjectCard';
import { projects } from '@/shared/data/projects';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function AllProjectsClient() {
  const t = useTranslations('projects');
  const tGeneral = useTranslations();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([]);
  const [showTechFilter, setShowTechFilter] = React.useState(false);

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
        tGeneral(project.description).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTechs.length === 0 || selectedTechs.every((tech) => project.tags.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs, tGeneral]);

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
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-light lg:text-5xl">{t('allProjects')}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {filteredProjects.length}{' '}
                  {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
                </p>
              </div>
              {hasActiveFilters && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
                    <X className="h-3.5 w-3.5" />
                    {t('clearFilters')}
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative max-w-lg flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                  <Search className="h-4 w-4 text-muted-foreground/60" />
                </span>
                <input
                  type="text"
                  placeholder={t('filterByName')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-full border border-border/50 bg-surface/50 pl-11 pr-10 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-muted-foreground/60 focus:border-glow-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-glow-primary/10"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setShowTechFilter(!showTechFilter)}
                className="flex items-center gap-2 rounded-full border border-border/50 bg-surface/50 px-4 py-2.5 text-sm backdrop-blur-sm transition-all hover:border-glow-primary hover:bg-surface"
              >
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t('filterByTech')}</span>
                {selectedTechs.length > 0 && (
                  <span className="rounded-full bg-glow-primary/10 px-2 py-0.5 text-xs font-medium text-glow-primary">
                    {selectedTechs.length}
                  </span>
                )}
                <motion.div
                  animate={{ rotate: showTechFilter ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </motion.div>
              </button>
            </div>

            <AnimatePresence>
              {showTechFilter && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="rounded-xl border border-border/50 bg-surface/30 p-4 backdrop-blur-sm">
                    <motion.div layout className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {allTechs.map((tech) => (
                          <motion.div
                            key={tech}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant={selectedTechs.includes(tech) ? 'glow' : 'secondary'}
                              className="cursor-pointer transition-all hover:scale-105 hover:shadow-md"
                              onClick={() => toggleTech(tech)}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid auto-rows-[400px] grid-cols-1 gap-4 sm:auto-rows-[420px] md:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-4 lg:gap-6"
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
