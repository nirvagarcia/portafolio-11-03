export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Nirvana Garcia',
  title: 'Nirvana Garcia — AI & Software Engineer',
  description:
    'Premium portfolio showcasing AI and software engineering projects, expertise in modern web technologies, and innovative solutions.',
  url: 'https://nirvanagarcia.com',
  author: {
    name: 'Nirvana Garcia',
    title: 'AI & Software Engineer',
    email: 'hello@nirvanagarcia.com',
    github: 'https://github.com/nirvanagarcia',
    linkedin: 'https://linkedin.com/in/nirvanagarcia',
  },
};
