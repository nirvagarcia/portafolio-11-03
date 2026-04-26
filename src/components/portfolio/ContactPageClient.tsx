'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, MapPin, Clock, X, Check, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/51986689120?text=Hola%20Nirvana%2C%20deseo%20realizar%20un%20proyecto%20contigo',
    color: 'from-green-600 to-green-400',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/nirvana-garcia/',
    color: 'from-blue-600 to-blue-400',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/nirvagarcia',
    color: 'from-gray-700 to-gray-500',
  },
];

export function ContactPageClient() {
  const t = useTranslations('contact');
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nirvagarciav@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent pt-20">
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold lg:text-6xl">{t('title')}</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card/50 hover:bg-card/80 group relative overflow-hidden rounded-3xl border border-border/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl" />

              <div className="relative space-y-6">
                <div>
                  <h2 className="mb-6 text-2xl font-bold">{t('connect')}</h2>

                  <div className="space-y-4">
                    <motion.button
                      onClick={handleEmailClick}
                      whileHover={{ x: 5 }}
                      className="flex w-full items-start gap-4 text-left transition-opacity hover:opacity-80"
                    >
                      <div className="rounded-xl bg-primary/10 p-3">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{t('email')}</p>
                        <p className="text-sm text-muted-foreground">nirvagarciav@gmail.com</p>
                      </div>
                    </motion.button>

                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{t('location')}</p>
                        <p className="text-sm text-muted-foreground">{t('locationValue')}</p>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{t('responseTime')}</p>
                        <p className="text-sm text-muted-foreground">{t('responseValue')}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card/50 rounded-3xl border border-border/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-lg font-semibold">{t('followMe')}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/social relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover/social:opacity-10`}
                    />
                    <div className="relative flex items-center gap-3">
                      <social.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{social.name}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="rounded-3xl border border-border/50 bg-surface/30 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">{t('funFact')}</span> {t('funFactText')}
            </p>
          </motion.div> */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            {t('preferEmail')}{' '}
            <button
              onClick={handleCopyEmail}
              className="relative inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            >
              nirvagarciav@gmail.com
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-green-500 px-3 py-1 text-xs text-white shadow-lg"
                  >
                    <Check className="mr-1 inline-block h-3 w-3" />
                    ¡Copiado!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </p>
        </motion.div>
      </div>

      {/* Email Modal */}
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
                <p className="mb-6 text-muted-foreground">{t('email')}</p>

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
    </div>
  );
}
