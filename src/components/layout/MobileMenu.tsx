'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = React.useState(false);

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return currentPath === href || (href === '/' && currentPath === '/');
  };

  const navItems = [
    {
      key: 'home',
      href: '/',
      prefix: 'cd ./',
    },
    {
      key: 'projects',
      href: '/projects',
      prefix: './',
    },
    {
      key: 'about',
      href: '/about',
      prefix: 'cat ',
    },
    {
      key: 'contact',
      href: '/contact',
      prefix: 'vim ',
    },
  ];

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const menuOverlay = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col"
          >
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

            <nav className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-20">
              {navItems.map((item, index) => {
                const commandLabel = t(`${item.key}Command`);
                const command = `$ ${item.prefix}${commandLabel}`;

                return (
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
                        'group relative flex w-full items-center justify-center rounded-2xl px-8 py-6 font-mono transition-all',
                        isActive(item.href)
                          ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <span className="text-xl font-medium tracking-wide">{command}</span>

                      {isActive(item.href) && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute -bottom-1 h-1 w-16 rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card flex items-center justify-center rounded-full p-2 transition-all hover:scale-105 active:scale-95"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && createPortal(menuOverlay, document.body)}
    </>
  );
}
