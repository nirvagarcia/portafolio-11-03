import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200',
          'focus-ring disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg':
              variant === 'default',
            'border border-border bg-surface hover:border-primary/50 hover:bg-surface-elevated':
              variant === 'outline',
            'hover:bg-surface hover:text-foreground': variant === 'ghost',
            'glass hover:bg-surface/70': variant === 'glass',
          },
          {
            'h-10 px-6 py-2': size === 'default',
            'h-9 px-4 text-xs': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
