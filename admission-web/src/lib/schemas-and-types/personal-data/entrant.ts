export interface Entrant {
  passportSeries?: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string;
  email: string;
  region: string;
  settlement: string;
  address: string;
  index: string;
  study_form?: boolean;
  submission_in_corpus?: boolean;
  oldPassportTemplate?: boolean;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  middleName?: string;
  passportSeries?: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string;
  email: string;
  region: string;
  settlement: string;
  address: string;
  index: string;
  oldPassportTemplate?: boolean;
}
