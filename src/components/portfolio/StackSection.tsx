'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { TechDetailModal } from './TechDetailModal';
import { getTechById } from '@/shared/data/stack';
import type { Tech } from '@/shared/types/stack';

interface DiagramTech {
  id: string;
  icon: string;
}

interface DiagramLayer {
  id: string;
  labelKey: string;
  color: string;
  techs: DiagramTech[];
}

interface Connection {
  from: string;
  to: string;
  primary?: boolean;
}

interface PathData {
  id: string;
  d: string;
  color: string;
  width: number;
  opacity: number;
  glow: boolean;
}

const LAYER_COLORS = {
  ai: 'hsl(var(--muted-foreground))',
  frontend: 'hsl(var(--muted-foreground))',
  backend: 'hsl(var(--muted-foreground))',
  data: 'hsl(var(--muted-foreground))',
  infrastructure: 'hsl(var(--muted-foreground))',
  testing: 'hsl(var(--muted-foreground))',
} as const;

const diagramLayers: DiagramLayer[] = [
  {
    id: 'ai',
    labelKey: 'stack.layers.ai',
    color: LAYER_COLORS.ai,
    techs: [
      { id: 'openai', icon: '/techstack/openai.png' },
      { id: 'watsonx', icon: '/techstack/watsonx.png' },
      { id: 'ollama', icon: '/techstack/ollama.png' },
      { id: 'langchain', icon: '/techstack/langchain.png' },
      { id: 'huggingface', icon: '/techstack/huggingface.png' },
    ],
  },
  {
    id: 'frontend',
    labelKey: 'stack.layers.frontend',
    color: LAYER_COLORS.frontend,
    techs: [
      { id: 'react', icon: '/techstack/reactjs.png' },
      { id: 'nextjs', icon: '/techstack/nextjs.png' },
      { id: 'javascript', icon: '/techstack/javascript.png' },
      { id: 'typescript', icon: '/techstack/typescript.png' },
    ],
  },
  {
    id: 'backend',
    labelKey: 'stack.layers.backend',
    color: LAYER_COLORS.backend,
    techs: [
      { id: 'nodejs', icon: '/techstack/nodejs.png' },
      { id: 'nestjs', icon: '/techstack/nestjs.png' },
      { id: 'fastapi', icon: '/techstack/fastapi.png' },
      { id: 'django', icon: '/techstack/django.png' },
      { id: 'python', icon: '/techstack/python.png' },
    ],
  },
  {
    id: 'data',
    labelKey: 'stack.layers.data',
    color: LAYER_COLORS.data,
    techs: [
      { id: 'postgresql', icon: '/techstack/postgresql.png' },
      { id: 'mongodb', icon: '/techstack/mongodb.png' },
      { id: 'chromadb', icon: '/techstack/chromadb.png' },
      { id: 'prisma', icon: '/techstack/prisma.png' },
    ],
  },
  {
    id: 'infrastructure',
    labelKey: 'stack.layers.infrastructure',
    color: LAYER_COLORS.infrastructure,
    techs: [
      { id: 'docker', icon: '/techstack/docker.png' },
      { id: 'gcp', icon: '/techstack/gcp.png' },
      { id: 'azure', icon: '/techstack/azure.png' },
      { id: 'git', icon: '/techstack/git.png' },
      { id: 'githubActions', icon: '/techstack/githubActions.png' },
    ],
  },
  {
    id: 'testing',
    labelKey: 'stack.layers.testing',
    color: LAYER_COLORS.testing,
    techs: [
      { id: 'jest', icon: '/techstack/jest.png' },
      { id: 'pytest', icon: '/techstack/pytest.png' },
      { id: 'cypress', icon: '/techstack/cypress.png' },
    ],
  },
];

const diagramConnections: Connection[] = [
  { from: 'openai', to: 'nextjs', primary: true },
  { from: 'langchain', to: 'typescript' },
  { from: 'ollama', to: 'react' },
  { from: 'nextjs', to: 'nodejs', primary: true },
  { from: 'nextjs', to: 'nestjs', primary: true },
  { from: 'typescript', to: 'fastapi' },
  { from: 'javascript', to: 'express' },
  { from: 'nestjs', to: 'prisma', primary: true },
  { from: 'nodejs', to: 'postgresql', primary: true },
  { from: 'python', to: 'mongodb' },
  { from: 'fastapi', to: 'chromadb' },
  { from: 'postgresql', to: 'gcp', primary: true },
  { from: 'prisma', to: 'docker' },
  { from: 'mongodb', to: 'azure' },
  { from: 'git', to: 'githubActions' },
  { from: 'githubActions', to: 'vercel' },
];

interface StackNodeProps {
  id: string;
  icon: string;
  layerColor: string;
  index: number;
  onNodeClick: (id: string) => void;
}

const StackNode = React.memo(
  React.forwardRef<HTMLDivElement, StackNodeProps>(function StackNodeInner(
    { id, icon, layerColor, index, onNodeClick },
    ref
  ) {
    const [hovered, setHovered] = React.useState(false);

    const nodeBackgroundNormal = 'hsl(var(--card))';
    const nodeBorderNormal = 'hsl(var(--border))';

    return (
      <motion.div
        ref={ref}
        className="relative cursor-pointer select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNodeClick(id)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ delay: index * 0.06, duration: 0.5 }}
      >
        <div
          className="absolute -inset-1 rounded-full transition-all duration-500"
          style={{
            background: 'hsl(var(--muted-foreground) / 0.3)',
            filter: 'blur(6px)',
            opacity: hovered ? 0.4 : 0,
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
          }}
        />

        <div
          className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full border transition-all duration-300 sm:h-[64px] sm:w-[64px] lg:h-[72px] lg:w-[72px]"
          style={{
            background: nodeBackgroundNormal,
            borderColor: hovered ? layerColor : nodeBorderNormal,
            borderWidth: '1.5px',
            boxShadow: hovered
              ? `0 0 30px ${layerColor}35, 0 0 50px ${layerColor}15`
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 60%)',
              opacity: hovered ? 0.8 : 0.3,
            }}
          />

          {icon.startsWith('/techstack/') ? (
            <div
              className="relative z-10 transition-all duration-300"
              style={{
                filter: hovered ? `drop-shadow(0 0 8px ${layerColor})` : 'none',
                transform: hovered ? 'scale(1.15)' : 'scale(1)',
                width: '60%',
                height: '60%',
              }}
            >
              <Image src={icon} alt={id} fill className="object-contain" sizes="48px" />
            </div>
          ) : (
            <span
              className="relative z-10 text-center text-lg transition-all duration-300 sm:text-xl lg:text-2xl"
              style={{
                filter: hovered ? `drop-shadow(0 0 8px ${layerColor})` : 'none',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {icon}
            </span>
          )}
        </div>
      </motion.div>
    );
  })
);

export function StackSection() {
  const t = useTranslations();
  const [selectedTech, setSelectedTech] = React.useState<Tech | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [paths, setPaths] = React.useState<PathData[]>([]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const handleNodeClick = React.useCallback((techId: string) => {
    const tech = getTechById(techId);
    if (tech) {
      setSelectedTech(tech);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  }, []);

  const calculatePaths = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const computed: PathData[] = [];

    diagramConnections.forEach((conn) => {
      const src = nodeRefs.current[conn.from];
      const tgt = nodeRefs.current[conn.to];
      if (!src || !tgt) return;

      const sr = src.getBoundingClientRect();
      const tr = tgt.getBoundingClientRect();

      const x1 = sr.left + sr.width / 2 - containerRect.left;
      const y1 = sr.top + sr.height - containerRect.top;
      const x2 = tr.left + tr.width / 2 - containerRect.left;
      const y2 = tr.top - containerRect.top;

      const verticalGap = Math.abs(y2 - y1);
      const curvature = Math.min(verticalGap * 0.45, 80);

      const d = `M ${x1} ${y1} C ${x1} ${y1 + curvature}, ${x2} ${y2 - curvature}, ${x2} ${y2}`;

      computed.push({
        id: `${conn.from}-${conn.to}`,
        d,
        color: 'hsl(var(--muted-foreground) / 0.3)',
        width: conn.primary ? 1.5 : 1,
        opacity: conn.primary ? 0.5 : 0.25,
        glow: false,
      });
    });

    setPaths(computed);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(calculatePaths, 150);
    const animationTimer = setTimeout(calculatePaths, 800);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(calculatePaths);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculatePaths]);

  return (
    <Section id="stack" className="relative py-12 sm:py-16 lg:py-20">
      <div className="h-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-center lg:hidden"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">Tech Stack</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('stack.subtitle')}</p>
        </motion.div>

        <div ref={containerRef} className="relative px-4 sm:px-6 lg:px-0">
          {paths.length > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              style={{ zIndex: 1 }}
            >
              <defs>
                <filter id="pathGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {paths.map((path, i) => (
                <motion.path
                  key={path.id}
                  d={path.d}
                  fill="none"
                  stroke={path.color}
                  strokeWidth={path.width}
                  strokeLinecap="round"
                  filter={path.glow ? 'url(#pathGlow)' : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [path.opacity, path.opacity * 0.3, path.opacity],
                  }}
                  transition={{
                    pathLength: {
                      duration: 1.5,
                      delay: 0.3 + i * 0.06,
                      ease: 'easeInOut',
                    },
                    opacity: {
                      duration: 3,
                      delay: 2 + i * 0.06,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                />
              ))}
            </svg>
          )}

          <div
            className="relative mx-auto flex max-w-fit flex-col gap-y-8 sm:gap-y-10 lg:gap-y-14"
            style={{ zIndex: 2 }}
          >
            {diagramLayers.map((layer, layerIndex) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: layerIndex * 0.08 }}
                className="flex items-center gap-px lg:gap-20"
              >
                <div className="hidden w-32 shrink-0 lg:block xl:w-40">
                  <div className="flex items-center justify-end gap-3">
                    <p className="text-right text-xs font-medium leading-snug tracking-wide text-muted-foreground xl:text-sm">
                      {t(layer.labelKey)}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex flex-1 flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start lg:gap-5 xl:gap-7">
                  {layer.techs.map((tech, techIndex) => (
                    <StackNode
                      key={tech.id}
                      ref={(el: HTMLDivElement | null) => {
                        nodeRefs.current[tech.id] = el;
                      }}
                      id={tech.id}
                      icon={tech.icon}
                      layerColor={layer.color}
                      index={techIndex}
                      onNodeClick={handleNodeClick}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <TechDetailModal tech={selectedTech} isOpen={isModalOpen} onClose={handleCloseModal} />
    </Section>
  );
}
