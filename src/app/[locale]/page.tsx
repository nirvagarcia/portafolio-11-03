import { HeroSection } from '@/components/portfolio/HeroSection';
import { LandingBackground } from '@/components/effects/LandingBackground';

export default function HomePage() {
  return (
    <div className="relative">
      <LandingBackground />
      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  );
}
