import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function ProjectLoading() {
  return (
    <div className="min-h-screen pt-24">
      <Section className="py-20">
        <Container>
          <div className="mb-12 animate-pulse text-center">
            <div className="mb-4 inline-block h-6 w-24 rounded-full bg-muted/50" />
            <div className="mx-auto mb-4 h-12 w-3/4 max-w-2xl rounded-lg bg-muted/50" />
            <div className="mx-auto h-7 w-2/3 max-w-xl rounded-lg bg-muted/50" />
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="animate-pulse rounded-2xl border border-border bg-surface/50 p-12 backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-muted/50" />
              </div>
              <div className="mx-auto mb-3 h-8 w-48 rounded-lg bg-muted/50" />
              <div className="mx-auto h-6 w-96 max-w-full rounded-lg bg-muted/50" />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-muted/50" />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
