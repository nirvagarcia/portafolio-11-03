import { HeroSection } from '@/components/portfolio/HeroSection';
import { StackSection } from '@/components/portfolio/StackSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { LandingBackground } from '@/components/effects/LandingBackground';

export default function HomePage() {
  return (
    <div className="relative">
      <LandingBackground />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <StackSection />
      </div>
    </div>
  );
}
