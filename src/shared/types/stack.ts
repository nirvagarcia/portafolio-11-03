export interface Tech {
  id: string;
  name: string;
  category: string;
  layer: 'ai' | 'frontend' | 'backend' | 'data' | 'infrastructure' | 'testing';
  icon?: string;
  highlights: string[];
  usageExamples: string[];
  narrative: string;
  codePreview?: {
    language: string;
    code: string;
  };
  connections?: string[];
}

export interface StackLayer {
  id: 'ai' | 'frontend' | 'backend' | 'data' | 'infrastructure' | 'testing';
  name: string;
  techs: Tech[];
  position: 'top' | 'middle-top' | 'middle-bottom' | 'bottom';
}
