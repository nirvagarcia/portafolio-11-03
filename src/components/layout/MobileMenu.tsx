'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface MobileMenuProps {
  locale: string;
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return currentPath === href || (href === '/' && currentPath === '/');
  };

  const navItems = [
    {
      key: 'home',
      href: '/',
      label: t('home'),
      command: 'cd ~',
    },
    {
      key: 'projects',
      href: '/projects',
      label: t('projects'),
      command: './Projects',
    },
    {
      key: 'about',
      href: '/about',
      label: t('about'),
      command: 'cat ABOUTME.md',
    },
    {
      key: 'contact',
      href: '/contact',
      label: t('contact'),
      command: 'vim CONTACT.md',
    },
  ];

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card flex items-center justify-center rounded-full p-2 transition-all hover:scale-105 active:scale-95"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* pointer-events-none when closed prevents ghost overlay from blocking clicks */}
      <div className={isOpen ? 'pointer-events-auto' : 'pointer-events-none'}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[101] flex flex-col"
              >
                {/* Header con botón de cerrar */}
                <div className="flex items-center justify-end p-6">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                    aria-label="Close menu"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.button>
                </div>

                {/* Navegación centrada */}
                <nav className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-20">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                      className="w-full max-w-md"
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'group relative flex w-full flex-col items-center gap-2 rounded-2xl px-8 py-6 font-mono transition-all',
                          isActive(item.href)
                            ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        {/* Símbolo $ */}
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <span>$</span>
                          <span className="text-xs">{item.command}</span>
                        </div>

                        {/* Label principal */}
                        <span className="text-2xl font-semibold tracking-wide">{item.label}</span>

                        {/* Indicador activo */}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute -bottom-1 h-1 w-16 rounded-full bg-white"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
