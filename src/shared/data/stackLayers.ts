import type { StackLayer } from '@/shared/types/stack';
import { technologies } from './stackTechnologies';

export const stackLayers: StackLayer[] = [
  {
    id: 'ai',
    name: 'stack.layers.ai',
    position: 'top',
    techs: technologies.filter((t) => t.layer === 'ai'),
  },
  {
    id: 'frontend',
    name: 'stack.layers.frontend',
    position: 'middle-top',
    techs: technologies.filter((t) => t.layer === 'frontend'),
  },
  {
    id: 'backend',
    name: 'stack.layers.backend',
    position: 'middle-top',
    techs: technologies.filter((t) => t.layer === 'backend'),
  },
  {
    id: 'data',
    name: 'stack.layers.data',
    position: 'middle-bottom',
    techs: technologies.filter((t) => t.layer === 'data'),
  },
  {
    id: 'infrastructure',
    name: 'stack.layers.infrastructure',
    position: 'middle-bottom',
    techs: technologies.filter((t) => t.layer === 'infrastructure'),
  },
  {
    id: 'testing',
    name: 'stack.layers.testing',
    position: 'bottom',
    techs: technologies.filter((t) => t.layer === 'testing'),
  },
];

export function getTechById(id: string) {
  return technologies.find((tech) => tech.id === id);
}
