'use client';

import * as React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/nirvagarcia', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/nirvana-garcia', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Mail, href: 'mailto:nirvagarciav@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-surface/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="font-mono text-sm text-muted-foreground">© {currentYear} @nirvagarcia</p>
            <p className="text-xs text-muted-foreground">Built with Next.js & Tailwind CSS</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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
  );
}
