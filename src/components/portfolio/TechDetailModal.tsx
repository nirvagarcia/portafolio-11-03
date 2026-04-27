'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Tech } from '@/shared/types/stack';

interface TechDetailModalProps {
  tech: Tech | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TechDetailModal({ tech, isOpen, onClose }: TechDetailModalProps) {
  const t = useTranslations();
  const tModal = useTranslations('techModal');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!tech || !mounted) return null;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface-elevated shadow-2xl ring-1 ring-border/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/50 bg-surface/80 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm text-muted-foreground">{tech.category}</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
              <div className="space-y-5">
                <h3 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  {tech.name}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tech.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{t(tech.narrative)}</p>

                {tech.codePreview && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                      {tModal('codePreview')}
                    </p>
                    <div className="overflow-hidden rounded-xl bg-[#1E1E1E] ring-1 ring-white/10">
                      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2D2D2D] px-4 py-2">
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="ml-2 text-xs text-white/50">
                          {tech.codePreview.language}
                        </span>
                      </div>
                      <div className="overflow-x-auto p-4">
                        <pre className="text-[13px] leading-relaxed">
                          <code className="font-mono text-[#D4D4D4]">{tech.codePreview.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
