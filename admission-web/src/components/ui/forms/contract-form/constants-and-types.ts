// export const initialValues: ExtendedContractBody = {
//   entrant: {
//     passportSeries: '',
//     passportNumber: '',
//     passportInstitute: '',
//     passportDate: '',
//     address: '',
//     settlement: '',
//     valueCode: '',
//     phoneNumber: '',
//     region: '',
//     email: '',
//     index: '',
//   },
//   representative: {
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     passportSeries: '',
//     passportNumber: '',
//     passportInstitute: '',
//     passportDate: '',
//     address: '',
//     settlement: '',
//     valueCode: '',
//     region: '',
//     phoneNumber: '',
//     email: '',
//     index: '',
//   },
//   customer: {
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     passportSeries: '',
//     passportNumber: '',
//     passportInstitute: '',
//     passportDate: '',
//     address: '',
//     settlement: '',
//     valueCode: '',
//     region: '',
//     phoneNumber: '',
//     email: '',
//     index: '',
//   },
//   meta: {
//     degree: '' as EducationalDegree,
//     programType: '' as EducationalProgramType,
//     educationalProgram: '',
//
//     studyType: '' as StudyTypeParam,
//     studyForm: '' as StudyFormParam,
//     paymentType: '' as PaymentTypeParam,
//     speciality: '',
//     isToAdmission: false,
//     isForcePushed: false,
//   },
//   helper: {
//     entrantPassportType: PassportType.value,
//     entrantHasNoCode: false,
//     entrantHasNoMvaluedleName: false,
//
//     representativePassportType: PassportType.value,
//     representativeHasNoCode: false,
//     representativeHasNoMvaluedleName: false,
//
//     customerPassportType: PassportType.value,
//     customerHasNoCode: false,
//     customerHasNoMvaluedleName: false,
//
//     hasCustomer: false,
//     isAdult: false,
//
//     secretNumber: '',
//     forcePushedNumber: '',
//   },
// };
export const kyiv = 'м. Київ';

export const REGIONS = [
  { label: 'м. Київ', value: kyiv },
  { label: 'Київська обл.', value: 'Київська обл.' },
  { label: 'Вінницька обл.', value: 'Вінницька обл.' },
  { label: 'Волинська обл.', value: 'Волинська обл.' },
  { label: 'Дніпропетровська обл.', value: 'Дніпропетровська обл.' },
  { label: 'Донецька обл.', value: 'Донецька обл.' },
  { label: 'Житомирська обл.', value: 'Житомирська обл.' },
  { label: 'Закарпатська обл.', value: 'Закарпатська обл.' },
  { label: 'Запорізька обл.', value: 'Запорізька обл.' },
  { label: 'Івано-Франківська обл.', value: 'Івано-Франківська обл.' },
  { label: 'Кіровоградська обл.', value: 'Кіровоградська обл.' },
  { label: 'АР Крим', value: 'АР Крим' },
  { label: 'Луганська обл.', value: 'Луганська обл.' },
  { label: 'Львівська обл.', value: 'Львівська обл.' },
  { label: 'Миколаївська обл.', value: 'Миколаївська обл.' },
  { label: 'Одеська обл.', value: 'Одеська обл.' },
  { label: 'Полтавська обл.', value: 'Полтавська обл.' },
  { label: 'Рівненська обл.', value: 'Рівненська обл.' },
  { label: 'Сумська обл.', value: 'Сумська обл.' },
  { label: 'Тернопільська обл.', value: 'Тернопільська обл.' },
  { label: 'Харківська обл.', value: 'Харківська обл.' },
  { label: 'Херсонська обл.', value: 'Херсонська обл.' },
  { label: 'Хмельницька обл.', value: 'Хмельницька обл.' },
  { label: 'Черкаська обл.', value: 'Черкаська обл.' },
  { label: 'Чернівецька обл.', value: 'Чернівецька обл.' },
  { label: 'Чернігівська обл.', value: 'Чернігівська обл.' },
];

export const StepperFormKeys = {
  1: ['fullName', 'dob', 'email', 'phone'],
  2: [
    'entrant$passportSeries',
    'entrant$passportNumber',
    'entrant$passportInstitute',
    'entrant$passportDate',
    'entrant$address',
    'entrant$settlement',
    'entrant$valueCode',
    'entrant$phoneNumber',
    'entrant$region',
    'entrant$email',
    'entrant$index',
    'entrant$idCode',
    'entrant$idCodeAbsent',
    'entrant',
  ],
  3: [
    'representative$passportSeries',
    'representative$passportNumber',
    'representative$passportInstitute',
    'representative$passportDate',
    'representative$address',
    'representative$settlement',
    'representative$valueCode',
    'representative$phoneNumber',
    'representative$region',
    'representative$email',
    'representative$index',
    'representative$idCode',
    'representative$idCodeAbsent',
    'representative',
  ],
  4: ['loanAmount', 'loanPurpose', 'repaymentTerms', 'repaymentStartDate'],
  5: ['bankName', 'accountNumber', 'routingNumber', 'creditScore'],
} as const;

export type StepperFormKeysType =
  (typeof StepperFormKeys)[keyof typeof StepperFormKeys][number];

export type StepperFormValues = {
  [FormName in StepperFormKeysType]: FormName extends
    | 'entrant'
    | 'loanAmount'
    | 'repaymentTerms'
    | 'creditScore'
    ? number
    : string;
};
