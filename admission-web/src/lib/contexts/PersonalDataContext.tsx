import { Entrant, PersonalData } from '@/lib/types/entrant.types';
import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from 'react';

interface ContextProps {
  isAdult: boolean;
  setIsAdult: (value: boolean) => void;
  isAnotherPayer: boolean;
  setIsAnotherPayer: (value: boolean) => void;
  entrantData: Entrant | null;
  setEntrantData: (value: Entrant) => void;
  representativeData: PersonalData | null;
  setRepresentativeData: (value: PersonalData) => void;
  customerData: PersonalData | null;
  setCustomerData: (value: PersonalData) => void;
  activeStep: number;
  setActiveStep: (value: (prevState: number) => number) => void;
}

const PersonalDataContext = createContext<ContextProps | null>(null);

const PersonalDataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdult, setIsAdult] = useState(true);
  const [isAnotherPayer, setIsAnotherPayer] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [entrantData, setEntrantData] = useState<Entrant | null>(null);
  const [representativeData, setRepresentativeData] =
    useState<PersonalData | null>(null);

  const [customerData, setCustomerData] = useState<PersonalData | null>(null);

  return (
    <PersonalDataContext.Provider
      value={{
        isAdult,
        setIsAdult,
        isAnotherPayer,
        setIsAnotherPayer,
        entrantData,
        setEntrantData,
        representativeData,
        setRepresentativeData,
        activeStep,
        setActiveStep,
        customerData,
        setCustomerData,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
};

const usePersonalDataContext = (): ContextProps => {
  const context = useContext(PersonalDataContext);
  if (!context) {
    throw new Error(
      'PersonalDataContext must be used within a PersonalDataContextProvider'
    );
  }
  return context;
};

export { PersonalDataContextProvider, usePersonalDataContext };
