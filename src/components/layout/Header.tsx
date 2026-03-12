'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Home, Menu, X } from 'lucide-react';
import { Navbar } from './Navbar';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { navItems } from '@/shared/data/navigation';
import { cn } from '@/shared/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const t = useTranslations('nav');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <Container>
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            isScrolled && 'glass-card rounded-full px-6 py-3'
          )}
        >
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-glow-primary"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Link>

          <Navbar locale={locale} />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 animate-fade-in bg-background/95 backdrop-blur-lg md:hidden">
          <Container>
            <nav className="flex flex-col gap-2 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="rounded-lg px-6 py-4 text-base font-medium transition-colors hover:bg-surface-elevated"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
