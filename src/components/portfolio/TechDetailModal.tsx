'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Tech } from '@/shared/types/stack';

interface TechDetailModalProps {
  tech: Tech | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TechDetailModal({ tech, isOpen, onClose }: TechDetailModalProps) {
  const t = useTranslations();
  const [narrativeExpanded, setNarrativeExpanded] = React.useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!tech) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-surface-elevated shadow-2xl ring-1 ring-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Mac Style */}
              <div className="flex items-center justify-between border-b border-border/50 bg-surface/80 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">Tech Detail</h2>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-surface-hover rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Selected Tech */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Selected:</p>
                    <h3 className="mt-1 text-2xl font-bold text-glow-primary">
                      {tech.name}{' '}
                      <span className="text-lg font-normal text-muted-foreground">
                        ({tech.category})
                      </span>
                    </h3>
                  </div>

                  {/* Usage Examples */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Usage <span className="font-normal">(selected examples):</span>
                    </p>
                    <ol className="mt-2 space-y-1 pl-5 text-sm">
                      {tech.usageExamples.map((example, index) => (
                        <li key={index} className="list-decimal text-foreground/90">
                          {t(example)}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Narrative */}
                  <div>
                    <button
                      onClick={() => setNarrativeExpanded(!narrativeExpanded)}
                      className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Narrative{' '}
                      <span className="text-xs font-normal">
                        (click to {narrativeExpanded ? 'collapse' : 'expand'}):
                      </span>
                      <motion.svg
                        animate={{ rotate: narrativeExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {narrativeExpanded && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 overflow-hidden text-sm leading-relaxed text-foreground/80"
                        >
                          {t(tech.narrative)}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {!narrativeExpanded && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/80">
                        {t(tech.narrative)}
                      </p>
                    )}
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-3 rounded-lg bg-surface/50 p-4 ring-1 ring-border/30">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-glow-primary/30">
                      <Image
                        src="/images/profile.webp"
                        alt="Nirvana Garcia"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Nirvana Garcia</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mic className="h-3.5 w-3.5" />
                        <span>AI & Software Engineer</span>
                      </div>
                    </div>
                  </div>

                  {/* Code Preview */}
                  {tech.codePreview && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        Code Preview <span className="font-normal">(syntax highlight):</span>
                      </p>
                      {/* Mac-style Terminal Window */}
                      <div className="overflow-hidden rounded-xl bg-[#1E1E1E] ring-1 ring-white/10">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 border-b border-white/10 bg-[#2D2D2D] px-4 py-2.5">
                          <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                            <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                            <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                          </div>
                          <span className="ml-2 text-xs text-white/60">
                            {tech.codePreview.language}
                          </span>
                        </div>
                        {/* Code Content */}
                        <div className="overflow-x-auto p-4">
                          <pre className="text-[13px] leading-relaxed">
                            <code className="font-mono text-[#D4D4D4]">
                              {tech.codePreview.code}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
