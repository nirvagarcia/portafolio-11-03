import * as React from 'react';
import { cn } from '@/shared/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-colors',
        'placeholder:text-muted-foreground',
        'focus-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-primary/50',
        'resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
