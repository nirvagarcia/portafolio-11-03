import * as React from 'react';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/shared/data/projects';
import type { Locale } from '@/shared/config/locales';

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    projectId: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Project History`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId, locale } = await params;
  const t = await getTranslations('projects');

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <Section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge variant="glow" className="mb-4">
              {t('history')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{t(project.description)}</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-surface/50 p-12 text-center backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-glow-primary/20 to-glow-secondary/20">
                  <svg
                    className="h-10 w-10 text-glow-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold">Coming Soon</h2>
              <p className="text-muted-foreground">
                The detailed history and story of this project will be available soon.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
