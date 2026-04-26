'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Github, ExternalLink, Clock, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/shared/types/project';

interface BentoProjectCardProps {
  project: Project;
  index: number;
  size?: 'large' | 'medium' | 'small';
}

export function BentoProjectCard({ project, index, size = 'medium' }: BentoProjectCardProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showFullContent = isMobile || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showFullContent ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 backdrop-blur-[2px]"
        />
      </div>

      <div className="relative flex h-full flex-col justify-between p-6 pb-8 lg:p-8 lg:pb-10">
        {project.id === 'bridge' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
          >
            <Badge variant="glow" className="backdrop-blur-md">
              Featured
            </Badge>
          </motion.div>
        )}

        <div className="space-y-3">
          <div>
            <h3
              className={`font-bold text-white transition-all duration-300 ${
                size === 'large' ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
              }`}
            >
              {project.title}
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: showFullContent ? 0 : 1,
              y: showFullContent ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-white/20 bg-white/10 text-xs text-white backdrop-blur-md"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showFullContent ? 1 : 0,
              y: showFullContent ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            <p
              className={`text-white/90 ${
                size === 'large'
                  ? 'line-clamp-4 text-base lg:text-lg'
                  : 'line-clamp-3 text-sm lg:text-base'
              }`}
            >
              {t(project.description)}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-white/20 bg-white/10 text-white backdrop-blur-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* <Link
                href={`/projects/${project.id}`}
                className="group/btn flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Clock className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                <span>{t('projects.history')}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link> */}

              <div className="flex items-center gap-2">
                {/* {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
                    aria-label={t('projects.viewCode')}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )} */}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
                    aria-label={t('projects.viewDemo')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showFullContent ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-glow-primary/30"
      />
    </motion.div>
  );
}
