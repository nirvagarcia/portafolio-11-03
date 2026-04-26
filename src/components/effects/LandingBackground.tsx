export function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Orb 1 — mobile: smaller + less blur, desktop: full size */}
      <div
        className="absolute left-[10%] top-[8%] h-[250px] w-[250px] rounded-full bg-glow-primary/5 blur-[60px] dark:bg-glow-primary/35 sm:h-[500px] sm:w-[500px] sm:bg-glow-primary/0 sm:blur-[120px]"
        style={{ willChange: 'transform', animation: 'orb-drift-1 20s infinite linear' }}
      />

      {/* Orb 2 — mobile: smaller + less blur, desktop: full size */}
      <div
        className="bg-glow-secondary/4 dark:bg-glow-secondary/28 absolute right-[15%] top-[15%] h-[280px] w-[280px] rounded-full blur-[65px] sm:h-[600px] sm:w-[600px] sm:bg-glow-secondary/0 sm:blur-[130px]"
        style={{ willChange: 'transform', animation: 'orb-drift-2 25s 1s infinite linear' }}
      />

      {/* Orb 3 — desktop only */}
      <div
        className="bg-glow-secondary/4 absolute left-[5%] top-[40%] hidden h-[480px] w-[480px] rounded-full blur-[115px] dark:bg-glow-secondary/25 sm:block sm:bg-glow-secondary/0"
        style={{ willChange: 'transform', animation: 'orb-drift-3 22s 2s infinite linear' }}
      />

      {/* Orb 4 — mobile: smaller + less blur, desktop: full size */}
      <div
        className="dark:bg-glow-primary/27 absolute right-[10%] top-[45%] h-[260px] w-[260px] rounded-full bg-glow-primary/5 blur-[60px] sm:h-[520px] sm:w-[520px] sm:bg-glow-primary/0 sm:blur-[125px]"
        style={{ willChange: 'transform', animation: 'orb-drift-4 23s 3.5s infinite linear' }}
      />

      {/* Orb 5 — desktop only */}
      <div
        className="bg-glow-primary/4 absolute left-[60%] top-[65%] hidden h-[450px] w-[450px] rounded-full blur-[110px] dark:bg-glow-primary/20 sm:block sm:bg-glow-primary/0"
        style={{ willChange: 'transform', animation: 'orb-drift-5 19s 5s infinite linear' }}
      />

      {/* Orb 6 — desktop only */}
      <div
        className="bg-glow-secondary/3 dark:bg-glow-secondary/18 absolute left-[20%] top-[72%] hidden h-[430px] w-[430px] rounded-full blur-[105px] sm:block sm:bg-glow-secondary/0"
        style={{ willChange: 'transform', animation: 'orb-drift-6 21s 6s infinite linear' }}
      />

      {/* Orb 7 — desktop only */}
      <div
        className="bg-glow-primary/3 dark:bg-glow-primary/16 absolute right-[25%] top-[88%] hidden h-[380px] w-[380px] rounded-full blur-[95px] sm:block sm:bg-glow-primary/0"
        style={{ willChange: 'transform', animation: 'orb-drift-7 18s 7s infinite linear' }}
      />

      {/* Orb 8 — desktop only */}
      <div
        className="bg-glow-secondary/3 dark:bg-glow-secondary/17 absolute left-[45%] top-[82%] hidden h-[400px] w-[400px] rounded-full blur-[100px] sm:block sm:bg-glow-secondary/0"
        style={{ willChange: 'transform', animation: 'orb-drift-8 20s 8s infinite linear' }}
      />

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--glow-primary)) 0.5px, transparent 0.5px),
                           linear-gradient(90deg, hsl(var(--glow-primary)) 0.5px, transparent 0.5px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/60 dark:via-background/90 dark:to-background/80 sm:via-background/20 sm:to-background/40 sm:dark:via-background/40 sm:dark:to-background/70" />
    </div>
  );
}
