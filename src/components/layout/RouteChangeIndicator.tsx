'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteChangeIndicator() {
  const pathname = usePathname();

  useEffect(() => {
    const indicator = document.getElementById('route-change-indicator');
    if (indicator) {
      indicator.classList.remove('opacity-0');
      indicator.classList.add('opacity-100');

      const timer = setTimeout(() => {
        indicator.classList.remove('opacity-100');
        indicator.classList.add('opacity-0');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div
      id="route-change-indicator"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-1 bg-gradient-to-r from-glow-primary to-glow-secondary opacity-0 transition-opacity duration-300"
      role="progressbar"
      aria-label="Loading"
    />
  );
}
