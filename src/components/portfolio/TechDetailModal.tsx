'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github } from 'lucide-react';
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
  const tModal = useTranslations('techModal');
  const [expandedUsage, setExpandedUsage] = React.useState<number | null>(null);

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-surface-elevated shadow-2xl ring-1 ring-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border/50 bg-surface/80 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">{tModal('title')}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-surface-hover rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 p-3 ring-1 ring-border/40 backdrop-blur-sm">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-purple-500/40 ring-offset-2 ring-offset-surface">
                      <Image
                        src="/images/nirvana-github.png"
                        alt="Nirvana Garcia"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold">Nirvana Garcia</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Github className="h-3 w-3" />
                        <span>{tModal('role')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                      {tech.name}{' '}
                      <span className="text-lg font-normal text-muted-foreground">
                        ({tech.category})
                      </span>
                    </h3>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-medium text-muted-foreground">
                      Usage <span className="font-normal">(selected examples):</span>
                    </p>
                    <div className="space-y-2">
                      {tech.usageExamples.map((example, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg border border-border/50 bg-surface/30 transition-all hover:border-purple-500/50"
                        >
                          <button
                            onClick={() => setExpandedUsage(expandedUsage === index ? null : index)}
                            className="group w-full p-3 text-left transition-all hover:bg-surface/60"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs font-bold text-purple-500">
                                {index + 1}
                              </span>
                              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                                {t(example)}
                              </p>
                              <motion.span
                                animate={{ rotate: expandedUsage === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-muted-foreground"
                              >
                                ▼
                              </motion.span>
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedUsage === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-border/30 bg-surface/50 p-3 text-sm text-muted-foreground">
                                  <p className="italic">
                                    {tech.narrative
                                      ? t(tech.narrative)
                                      : 'Additional details about this usage example.'}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {tech.codePreview && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        {tModal('codePreview')}{' '}
                        <span className="font-normal">({tModal('syntaxHighlight')}):</span>
                      </p>
                      <div className="overflow-hidden rounded-xl bg-[#1E1E1E] ring-1 ring-white/10">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
