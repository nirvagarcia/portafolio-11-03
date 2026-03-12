export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  codeUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}
