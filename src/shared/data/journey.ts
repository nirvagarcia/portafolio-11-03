export interface JourneyItem {
  id: string;
  type: 'work' | 'education';
  organization: string;
  role?: string;
  degree?: string;
  startDate: string;
  endDate: string | 'present';
  logo?: string;
  color: string;
  description?: string;
}

export const journeyData: JourneyItem[] = [
  {
    id: 'laraigo',
    type: 'work',
    organization: 'Laraigo',
    role: 'AI & Software Engineer',
    startDate: '2023',
    endDate: 'present',
    logo: '/images/journey/laraigo.png',
    color: 'from-blue-500 to-cyan-500',
    description: 'Building AI-powered solutions and modern web applications',
  },
  {
    id: 'upc',
    type: 'education',
    organization: 'UPC',
    degree: 'Software Engineering',
    startDate: '2021',
    endDate: '2025',
    logo: '/images/journey/upc.png',
    color: 'from-purple-500 to-pink-500',
    description: "Bachelor's degree in Software Engineering",
  },
];
