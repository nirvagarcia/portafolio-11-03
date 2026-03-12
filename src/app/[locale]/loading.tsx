export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-glow-primary/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-glow-secondary border-t-glow-primary"></div>
          <div className="absolute inset-4 animate-pulse rounded-full bg-glow-primary/20"></div>
        </div>

        <div className="space-y-2 text-center">
          <p className="font-medium text-foreground">Loading</p>
          <div className="flex justify-center gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-glow-primary [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-glow-primary [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-glow-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
