import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'glass';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative py-16 sm:py-20 lg:py-24',
          {
            'bg-transparent': variant === 'default',
            'bg-surface': variant === 'dark',
            glass: variant === 'glass',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export { Section };
