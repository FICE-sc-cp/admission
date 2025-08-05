import { StudyForm } from '$/utils/src/enums/StudyFormEnum';

export const studyFormLabels: Record<StudyForm, string> = {
  [StudyForm.FULL_TIME]: 'Денна',
  [StudyForm.PART_TIME]: 'Заочна',
  [StudyForm.REMOTE]: 'Дистанційна',
};
