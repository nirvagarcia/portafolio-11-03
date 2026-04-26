'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, MessageCircle, X } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showEmailModal, setShowEmailModal] = React.useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      href: 'https://wa.me/51986689120?text=Hola%20Nirvana%2C%20deseo%20realizar%20un%20proyecto%20contigo',
      label: 'WhatsApp',
      isEmail: false,
    },
    {
      icon: Mail,
      href: '#',
      label: 'Email',
      isEmail: true,
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/nirvana-garcia',
      label: 'LinkedIn',
      isEmail: false,
    },
    {
      icon: Github,
      href: 'https://github.com/nirvagarcia',
      label: 'GitHub',
      isEmail: false,
    },
  ];

  return (
    <>
      <footer className="relative border-t border-border/50 bg-surface/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <p className="font-mono text-sm text-muted-foreground">
                © {currentYear} @nirvagarcia
              </p>
              <p className="text-xs text-muted-foreground">Built with Next.js & Tailwind CSS</p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={social.isEmail ? handleEmailClick : undefined}
                  target={social.isEmail ? undefined : '_blank'}
                  rel={social.isEmail ? undefined : 'noopener noreferrer'}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-surface/50 transition-all hover:border-glow-primary hover:bg-surface"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 transition-colors group-hover:text-glow-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-card relative w-full max-w-md rounded-3xl border border-border/50 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEmailModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Email</h3>
                <p className="mb-6 text-muted-foreground">Correo electrónico</p>

                <div className="rounded-2xl border border-border/50 bg-muted/50 p-4">
                  <p className="select-all font-mono text-lg font-semibold">
                    nirvagarciav@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
