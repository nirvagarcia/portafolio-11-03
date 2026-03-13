'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { navItems } from '@/shared/data/navigation';
import { cn } from '@/shared/lib/utils';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return currentPath === href || (href === '/' && currentPath === '/');
  };

  return (
    <nav className="glass-card hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={`/${locale}${item.href}`}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            'hover:bg-surface-elevated',
            isActive(item.href) && 'bg-surface-elevated text-glow-primary'
          )}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
