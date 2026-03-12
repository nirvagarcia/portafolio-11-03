import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24">
      <Section className="py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="from-destructive/20 to-destructive/10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br">
                <svg
                  className="text-destructive h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold">Project Not Found</h1>
            <p className="mb-8 text-muted-foreground">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/#projects">Back to Projects</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
