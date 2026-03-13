'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ContactForm } from './ContactForm';
import { Mail, Github, Linkedin, Twitter, MapPin, Clock, Send } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
    color: 'from-blue-600 to-blue-400',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com',
    color: 'from-gray-700 to-gray-500',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
    color: 'from-sky-500 to-sky-400',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:nirvagarciav@gmail.com',
    color: 'from-purple-600 to-purple-400',
  },
];

export function ContactPageClient() {
  const t = useTranslations('contact');

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-primary/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[15%] h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6 inline-flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <Send className="relative h-16 w-16 text-primary" />
            </div>
          </motion.div>

          <h1 className="mb-4 text-5xl font-bold lg:text-6xl">{t('title')}</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="space-y-8">
              <div className="bg-card/50 hover:bg-card/80 group relative overflow-hidden rounded-3xl border border-border/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl" />

                <div className="relative space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-bold">Let's Connect</h2>

                    <div className="space-y-4">
                      <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">nirvagarciav@gmail.com</p>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">Lima, Peru</p>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Response Time</p>
                          <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 rounded-3xl border border-border/50 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-lg font-semibold">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  💡 <span className="font-medium">Fun fact:</span> I respond faster to messages
                  with coffee emojis
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-card/50 hover:bg-card/80 group relative overflow-hidden rounded-3xl border border-border/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl lg:p-12">
              <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-8">
                  <h2 className="mb-3 text-3xl font-bold">Send me a message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            Prefer email? Reach me directly at{' '}
            <a
              href="mailto:nirvagarciav@gmail.com"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              nirvagarciav@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
