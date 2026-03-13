'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return currentPath === href || (href === '/' && currentPath === '/');
  };

  const isInternalPage = !isActive('/');

  if (!isInternalPage) {
    return null;
  }

  const navCommands = [
    {
      key: 'projects',
      href: '/projects',
      command: './Projects',
      label: t('projects'),
    },
    {
      key: 'about',
      href: '/about',
      command: 'cat ABOUTME.md',
      label: t('about'),
    },
    {
      key: 'contact',
      href: '/contact',
      command: 'vim CONTACT.md',
      label: t('contact'),
    },
  ];

  return (
    <nav className="glass-card flex flex-wrap items-center justify-center gap-1 rounded-full px-2 py-1 transition-all duration-300">
      {navCommands.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            href={`/${locale}${item.href}`}
            className={cn(
              'group flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
              'hover:bg-surface-elevated',
              isActive(item.href) ? 'bg-surface-elevated text-glow-primary' : 'text-foreground'
            )}
          >
            <span className="text-muted-foreground">$</span>
            <span className="hidden sm:inline">{item.command}</span>
            <span className="sm:hidden">{item.label}</span>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
