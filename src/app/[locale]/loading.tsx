export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-glow-primary/20"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-glow-secondary border-t-glow-primary"></div>
        <div className="absolute inset-4 animate-pulse rounded-full bg-glow-primary/20"></div>
      </div>
    </div>
  );
}
