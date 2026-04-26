'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Github, ExternalLink, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/shared/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden transition-all">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="space-y-4 p-6">
          <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-glow-primary">
            {project.title}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">{t(project.description)}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {/* <Link
              href={`/projects/${project.id}`}
              className="group/btn flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-glow-secondary"
            >
              <Clock className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
              <span>{t('projects.history')}</span>
            </Link> */}

            <div className="ml-auto flex items-center gap-2">
              {/* {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface transition-colors hover:bg-glow-primary/10 hover:text-glow-primary"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface transition-colors hover:bg-glow-secondary/10 hover:text-glow-secondary"
                  aria-label={t('projects.viewDemo')}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
