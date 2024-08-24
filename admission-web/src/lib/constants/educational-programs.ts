import { EducationProgram } from '$/utils/src/enums/EducationalProgramEnum';

export const EducationProgramAbbreviation: Record<EducationProgram, string> = {
  [EducationProgram.CSSE]:
    "Інженерія програмного забезпечення комп'ютерних систем",
  [EducationProgram.ISSE]:
    'Інженерія програмного забезпечення інформаційних систем',
  [EducationProgram.IIS]: 'Інтегровані інформаційні системи',
  [EducationProgram.ISRS]: 'Інформаційне забезпечення робототехнічних систем',
  [EducationProgram.IMST]: 'Інформаційні управляючі системи та технології',
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
    label: EducationProgramAbbreviation[EducationProgram.ISRS],
    id: EducationProgram.ISRS,
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
  '121 Інженерія програмного забезпечення інформаційних систем',
  '121 Інженерія програмного забезпечення комп’ютерних систем',
  '123 Комп’ютерні системи та мережі',
  '126 Інформаційні системи та технології',
];

export const PROFESSIONAL = [
  '121 Інженерія програмного забезпечення інформаційних систем',
  '121 Інженерія програмного забезпечення комп’ютерних систем',
  '123 Комп’ютерні системи та мережі',
  '126 Інформаційні управляючі системи та технології',
  '126 Інтегровані інформаційні системи',
  '126 Інформаційне забезпечення робототехнічних систем',
];

export const SCIENTIFIC_PROGRAMS = [
  {
    label: '121 Інженерія програмного забезпечення інформаційних систем',
    value: 'IS',
  },
  {
    label: '121 Інженерія програмного забезпечення комп’ютерних систем',
    value: 'CS',
  },
  { label: '123 Комп’ютерні системи та мережі', value: 'CSN' },
  { label: '126 Інформаційні системи та технології', value: 'IST' },
];

export const PROFESSIONAL_PROGRAMS = [
  {
    label: '121 Інженерія програмного забезпечення інформаційних систем',
    value: 'IS',
  },
  {
    label: '121 Інженерія програмного забезпечення комп’ютерних систем',
    value: 'CS',
  },
  { label: '123 Комп’ютерні системи та мережі', value: 'CSN' },
  { label: '126 Інформаційні управляючі системи та технології', value: 'IMST' },
  { label: '126 Інтегровані інформаційні системи', value: 'IIS' },
  {
    label: '126 Інформаційне забезпечення робототехнічних систем',
    value: 'ISRS',
  },
];

export const ABBREVIATION_TO_PROGRAM: Record<string, string> = {
  IS: '121 Інженерія програмного забезпечення інформаційних систем',
  CS: '121 Інженерія програмного забезпечення комп’ютерних систем',
  CSN: '123 Комп’ютерні системи та мережі',
  IMST: '126 Інформаційні управляючі системи та технології',
  IIS: '126 Інтегровані інформаційні системи',
  ISRS: '126 Інформаційне забезпечення робототехнічних систем',
  IST: '126 Інформаційні системи та технології',
};

export const PROGRAM_TO_ABBREVIATION: Record<string, string> = {
  '121 Інженерія програмного забезпечення інформаційних систем': 'IS',
  '121 Інженерія програмного забезпечення комп’ютерних систем': 'CS',
  '123 Комп’ютерні системи та мережі': 'CSN',
  '126 Інформаційні управляючі системи та технології': 'IMST',
  '126 Інтегровані інформаційні системи': 'IIS',
  '126 Інформаційне забезпечення робототехнічних систем': 'ISRS',
  '126 Інформаційні системи та технології': 'IST',
};
