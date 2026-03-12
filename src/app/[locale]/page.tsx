import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase';
import { StackSection } from '@/components/portfolio/StackSection';

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <ProjectsShowcase />
      <StackSection />
    </div>
  );
}
