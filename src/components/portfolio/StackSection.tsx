'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
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
  ai: '#10B981',
  frontend: '#A78BFA',
  backend: '#818CF8',
  data: '#60A5FA',
  infrastructure: '#22D3EE',
  testing: '#C084FC',
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
      { id: 'git', icon: '/techstack/git.png' },
      { id: 'gcp', icon: '/techstack/gcp.png' },
      { id: 'azure', icon: '/techstack/azure.png' },
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
          className="absolute -inset-2 rounded-full transition-all duration-500"
          style={{
            background: layerColor,
            filter: 'blur(16px)',
            opacity: hovered ? 0.6 : 0,
            transform: hovered ? 'scale(1.3)' : 'scale(1)',
          }}
        />

        <div
          className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full transition-all duration-300 sm:h-[64px] sm:w-[64px] lg:h-[72px] lg:w-[72px]"
          style={{
            background: hovered
              ? 'rgba(15, 23, 42, 0.95)'
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.85) 100%)',
            border: `1.5px solid ${hovered ? layerColor : 'rgba(148, 163, 184, 0.15)'}`,
            boxShadow: hovered
              ? `0 0 30px ${layerColor}35, 0 0 50px ${layerColor}15, inset 0 1px 2px rgba(255,255,255,0.08)`
              : '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.05)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 60%)',
              opacity: hovered ? 1 : 0.5,
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
        color: conn.primary ? '#8B5CF6' : '#475569',
        width: conn.primary ? 2 : 1.2,
        opacity: conn.primary ? 0.45 : 0.18,
        glow: !!conn.primary,
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
    <Section id="stack" className="relative overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[5%] h-[600px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[8%] top-[35%] h-[550px] w-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 60%)',
            filter: 'blur(110px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute right-[8%] top-[60%] h-[550px] w-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 60%)',
            filter: 'blur(110px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.div
          className="absolute bottom-[10%] left-1/2 h-[450px] w-[650px] -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #22D3EE 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full"
            style={{
              background:
                i % 4 === 0
                  ? '#10B981'
                  : i % 4 === 1
                    ? '#8B5CF6'
                    : i % 4 === 2
                      ? '#22D3EE'
                      : '#60A5FA',
              left: `${10 + ((i * 8) % 80)}%`,
              top: `${15 + ((i * 12) % 70)}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 8 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => {
          const size = [12, 16, 20, 14, 18, 15, 13, 17][i];
          const colors = [
            '#10B981',
            '#8B5CF6',
            '#22D3EE',
            '#F59E0B',
            '#EC4899',
            '#6366F1',
            '#14B8A6',
            '#F97316',
          ];
          const positions = [
            { left: '15%', top: '20%' },
            { left: '85%', top: '25%' },
            { left: '25%', top: '55%' },
            { left: '75%', top: '60%' },
            { left: '45%', top: '15%' },
            { left: '55%', top: '75%' },
            { left: '10%', top: '80%' },
            { left: '90%', top: '45%' },
          ];
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: positions[i].left,
                top: positions[i].top,
                background: `radial-gradient(circle, ${colors[i]} 0%, ${colors[i]}80 50%, transparent 100%)`,
                boxShadow: `0 0 ${size * 2}px ${colors[i]}60, 0 0 ${size * 4}px ${colors[i]}30`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          );
        })}

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          style={{ zIndex: 0 }}
        >
          <defs>
            <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[
            { x1: '15%', y1: '20%', x2: '45%', y2: '15%', gradient: 'connectionGradient1' },
            { x1: '85%', y1: '25%', x2: '75%', y2: '60%', gradient: 'connectionGradient2' },
            { x1: '25%', y1: '55%', x2: '55%', y2: '75%', gradient: 'connectionGradient1' },
            { x1: '45%', y1: '15%', x2: '85%', y2: '25%', gradient: 'connectionGradient2' },
            { x1: '10%', y1: '80%', x2: '25%', y2: '55%', gradient: 'connectionGradient1' },
          ].map((line, i) => (
            <motion.line
              key={`line-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={`url(#${line.gradient})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}
        </svg>

        {/* Sparkle particles - like synaptic transmissions */}
        {[...Array(20)].map((_, i) => {
          // Deterministic pseudo-random values based on index to avoid hydration errors
          const seed1 = (i * 37 + 17) % 100;
          const seed2 = (i * 53 + 23) % 100;
          const seed3 = (i * 71 + 41) % 100;
          const seed4 = (i * 89 + 61) % 100;
          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute h-0.5 w-0.5 rounded-full"
              style={{
                background: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#22D3EE' : '#10B981',
                left: `${seed1}%`,
                top: `${seed2}%`,
                boxShadow: '0 0 4px currentColor, 0 0 8px currentColor',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [seed3 - 50, seed4 - 50],
                y: [seed4 - 50, seed3 - 50],
              }}
              transition={{
                duration: 2 + (seed1 % 30) / 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (seed2 % 50) / 10,
              }}
            />
          );
        })}

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(34, 211, 238, 0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center lg:mb-20"
        >
          <h2 className="mb-3 text-3xl font-light lg:text-4xl">{t('stack.title')}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:text-base">
            {t('stack.subtitle')}
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
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
                  strokeOpacity={path.opacity}
                  strokeLinecap="round"
                  filter={path.glow ? 'url(#pathGlow)' : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3 + i * 0.06,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </svg>
          )}

          <div
            className="relative mx-auto flex max-w-fit flex-col gap-y-10 lg:gap-y-14"
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
                    <p
                      className="text-right text-xs font-medium leading-snug tracking-wide xl:text-sm"
                      style={{ color: layer.color }}
                    >
                      {t(layer.labelKey)}
                    </p>
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: layer.color,
                        boxShadow: `0 0 10px ${layer.color}70, 0 0 20px ${layer.color}30`,
                      }}
                    />
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
