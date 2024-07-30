export interface Entrant {
  passportSeries?: string | null;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string | null;
  email: string;
  region: string;
  settlement: string | null;
  address: string;
  index: string;
  study_form?: string | null;
  submission_in_corpus?: boolean | null;
  oldPassportTemplate: boolean | null;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  middleName: string | null;
  passportSeries?: string | null;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string | null;
  email: string;
  region: string;
  settlement: string | null;
  address: string;
  index: string;
  oldPassportTemplate: boolean | null;
}
