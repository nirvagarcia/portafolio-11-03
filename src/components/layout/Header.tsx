'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';
import { Container } from '@/components/ui/Container';
import { cn } from '@/shared/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';

    if (currentPath === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/${locale}`);
    }
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'py-2' : 'py-6'
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-2 transition-all duration-300">
          <button
            onClick={handleLogoClick}
            className={cn(
              'group flex items-center gap-2 text-foreground transition-all sm:gap-3',
              isScrolled && 'glass-card rounded-full px-2 py-1.5 sm:px-3 sm:py-2'
            )}
            aria-label="Go to home"
          >
            <Image
              src="/images/headphones.png"
              alt="Logo"
              width={24}
              height={24}
              className="transition-transform duration-300 ease-out group-hover:rotate-12 sm:h-7 sm:w-7"
            />
            <span className="hidden font-mono text-sm text-muted-foreground sm:inline">
              @nirvagarcia
            </span>
          </button>

          <div className="hidden md:block">
            <Navbar locale={locale} />
          </div>

          <div
            className={cn(
              'flex items-center gap-1 transition-all',
              isScrolled && 'glass-card rounded-full px-2 py-1 sm:px-3 sm:py-1.5'
            )}
          >
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />

            <div className="md:hidden">
              <MobileMenu locale={locale} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
