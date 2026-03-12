'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { navItems } from '@/shared/data/navigation';
import { cn } from '@/shared/lib/utils';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [activeSection, setActiveSection] = React.useState('home');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.key);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="glass-card hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={`/${locale}${item.href}`}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            'hover:bg-surface-elevated',
            activeSection === item.key && 'bg-surface-elevated text-glow-primary'
          )}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
