export type NavItem = {
  key: string;
  href: string;
};

export const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '/contact' },
];
