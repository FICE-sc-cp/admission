import { EducationProgram } from '$/utils/src/enums/EducationalProgramEnum';

export const EducationProgramAbbreviation: Record<EducationProgram, string> = {
  [EducationProgram.CSSE]:
    "Інженерія програмного забезпечення комп'ютерних систем",
  [EducationProgram.ISSE]:
    'Інженерія програмного забезпечення інформаційних систем',
  [EducationProgram.IIS]: 'Інтегровані інформаційні системи',
  [EducationProgram.CGP]: "Програмування комп'ютерних ігор",
  [EducationProgram.CSN]: "Комп'ютерні системи та мережі",
  [EducationProgram.DRS]: 'Інформаційне забезпечення робототехнічних систем',
  [EducationProgram.IMST]: 'Інформаційні управляючі системи та технології',
  [EducationProgram.IST]: 'Інформаційні системи та технології',
  [EducationProgram.QSE]: 'Інженерія квантового програмного забезпечення'
};

export const IPeduPrograms = [
  {
    label: EducationProgramAbbreviation[EducationProgram.CSSE],
    id: EducationProgram.CSSE,
  },
  {
    label: EducationProgramAbbreviation[EducationProgram.ISSE],
    id: EducationProgram.ISSE,
  },
];
export const ISTeduPrograms = [
  {
    label: EducationProgramAbbreviation[EducationProgram.DRS],
    id: EducationProgram.DRS,
  },
  {
    label: EducationProgramAbbreviation[EducationProgram.IIS],
    id: EducationProgram.IIS,
  },
  {
    label: EducationProgramAbbreviation[EducationProgram.IMST],
    id: EducationProgram.IMST,
  },
];

export const SCIENTIFIC = [
  'F2 Інженерія програмного забезпечення інформаційних систем',
  'F2 Інженерія програмного забезпечення комп’ютерних систем',
  'F7 Комп’ютерні системи та мережі',
  'F6 Інформаційні системи та технології',
];

export const PROFESSIONAL = [
  'F2 Інженерія програмного забезпечення інформаційних систем',
  'F2 Інженерія програмного забезпечення комп’ютерних систем',
  "F2 Програмування комп'ютерних ігор",
  'F7 Комп’ютерні системи та мережі',
  'F6 Інформаційні управляючі системи та технології',
  'F6 Інтегровані інформаційні системи',
  'F6 Інформаційне забезпечення робототехнічних систем',
];

export const SCIENTIFIC_PROGRAMS = [
  {
    label: 'F2 Інженерія програмного забезпечення інформаційних систем',
    value: EducationProgram.ISSE,
  },
  {
    label: 'F2 Інженерія програмного забезпечення комп’ютерних систем',
    value: EducationProgram.CSSE,
  },
  { label: 'F7 Комп’ютерні системи та мережі', value: EducationProgram.CSN },
  { label: 'F6 Інформаційні системи та технології', value: EducationProgram.IST },
];

export const PROFESSIONAL_PROGRAMS = [
  {
    label: 'F2 Інженерія програмного забезпечення інформаційних систем',
    value: EducationProgram.ISSE,
  },
  {
    label: 'F2 Інженерія програмного забезпечення комп’ютерних систем',
    value: EducationProgram.CSSE,
  },
  {
    label: "F2 Інженерія квантового програмного забезпечення",
    value: EducationProgram.QSE,
  },
  { label: 'F7 Комп’ютерні системи та мережі', value: EducationProgram.CSN },
  {
    label: 'F6 Інформаційні управляючі системи та технології',
    value: EducationProgram.IMST,
  },
  { label: 'F6 Інтегровані інформаційні системи', value: EducationProgram.IIS },
  {
    label: 'F6 Інформаційне забезпечення робототехнічних систем',
    value: EducationProgram.DRS,
  },
];

export const ABBREVIATION_TO_PROGRAM: Record<EducationProgram, string> = {
  [EducationProgram.ISSE]:
    'F2 Інженерія програмного забезпечення інформаційних систем',
  [EducationProgram.CSSE]:
    'F2 Інженерія програмного забезпечення комп’ютерних систем',
  [EducationProgram.CGP]: "F2 Програмування комп'ютерних ігор",
  [EducationProgram.CSN]: 'F7 Комп’ютерні системи та мережі',
  [EducationProgram.IMST]: 'F6 Інформаційні управляючі системи та технології',
  [EducationProgram.IIS]: 'F6 Інтегровані інформаційні системи',
  [EducationProgram.DRS]: 'F6 Інформаційне забезпечення робототехнічних систем',
  [EducationProgram.IST]: 'F6 Інформаційні системи та технології',
  [EducationProgram.QSE]: 'F2 Інженерія квантового програмного забезпечення'
};

export const PROGRAM_TO_ABBREVIATION: Record<string, EducationProgram> = {
  'F2 Інженерія програмного забезпечення інформаційних систем':
    EducationProgram.ISSE,
  'F2 Інженерія програмного забезпечення комп’ютерних систем':
    EducationProgram.CSSE,
  "F2 Програмування комп'ютерних ігор": EducationProgram.CGP,
  'F7 Комп’ютерні системи та мережі': EducationProgram.CSN,
  'F6 Інформаційні управляючі системи та технології': EducationProgram.IMST,
  'F6 Інтегровані інформаційні системи': EducationProgram.IIS,
  'F6 Інформаційне забезпечення робототехнічних систем': EducationProgram.DRS,
};
