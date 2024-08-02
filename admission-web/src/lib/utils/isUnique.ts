import { TPriorities } from '@/lib/types/documents.types';

export const isUniquePriorities = (priorities: TPriorities[]): boolean => {
  for (let i = 0; i < priorities.length; i++) {
    for (let j = 0; j < priorities.length; j++) {
      if (i === j) continue;

      if (priorities[i].program === priorities[j].program) {
        return false;
      }
    }
  }
  return true;
};
