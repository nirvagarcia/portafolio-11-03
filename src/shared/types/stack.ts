export interface Tech {
  id: string;
  name: string;
  category: string;
  layer: 'ai' | 'core' | 'data' | 'infrastructure';
  icon?: string; // Optional icon name or emoji
  usageExamples: string[]; // Translation keys for projects/examples
  narrative: string; // Translation key for description
  codePreview?: {
    language: string;
    code: string;
  };
  connections?: string[]; // IDs of connected techs
}

export interface StackLayer {
  id: 'ai' | 'core' | 'data' | 'infrastructure';
  name: string; // Translation key
  techs: Tech[];
  position: 'top' | 'middle-top' | 'middle-bottom' | 'bottom';
}
