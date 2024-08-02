import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';

export const educationalDegreeLabels: Record<EducationalDegree, string> = {
  [EducationalDegree.BACHELOR]: 'Бакалавр',
  [EducationalDegree.MASTER]: 'Магістр',
  [EducationalDegree.PHD]: 'Доктор філософії',
};
