'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Languages, Check, Loader2 } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/shared/config/locales';
import { Button } from '@/components/ui/Button';
import { cn } from '@/shared/lib/utils';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isChanging, setIsChanging] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    setIsChanging(true);
    setIsOpen(false);

    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));

    setTimeout(() => setIsChanging(false), 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('select')}
        aria-expanded={isOpen}
        disabled={isChanging}
        className="hover:bg-transparent"
      >
        {isChanging ? (
          <Loader2 className="h-5 w-5 animate-spin text-glow-primary" />
        ) : (
          <Languages className="h-5 w-5" />
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="glass-card absolute right-0 top-full z-50 mt-2 min-w-[160px] animate-fade-in overflow-hidden rounded-lg p-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                disabled={isChanging}
                className={cn(
                  'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  'hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-50',
                  currentLocale === locale && 'bg-surface-elevated'
                )}
              >
                <span>{localeNames[locale]}</span>
                {currentLocale === locale && <Check className="h-4 w-4 text-glow-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
