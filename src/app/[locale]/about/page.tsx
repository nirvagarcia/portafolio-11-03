import { AboutSection } from '@/components/portfolio/AboutSection';
import { StackSection } from '@/components/portfolio/StackSection';
import { BackButton } from '@/components/ui/BackButton';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <BackButton />
      <div className="relative min-h-screen pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr]">
            <div>
              <AboutSection />
            </div>
            <div>
              <StackSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
