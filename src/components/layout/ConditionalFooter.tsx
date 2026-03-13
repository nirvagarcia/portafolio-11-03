'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();

  const isHomePage =
    pathname === '/en' ||
    pathname === '/es' ||
    pathname === '/pt' ||
    pathname === '/en/' ||
    pathname === '/es/' ||
    pathname === '/pt/' ||
    pathname.match(/^\/[a-z]{2}\/?$/);

  if (isHomePage) {
    return null;
  }

  return <Footer />;
}
