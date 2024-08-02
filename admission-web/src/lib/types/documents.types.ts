import { EducationProgram } from '$/utils/src';

export interface IPrioritySelect {
  label: string;
  id: EducationProgram;
}

export type TPriorities = {
  number: number;
  program: EducationProgram;
};

export type mimeType =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
