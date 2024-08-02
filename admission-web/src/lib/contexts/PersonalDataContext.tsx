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
  isContract: boolean;
  setIsContract: (value: boolean) => void;
  isAnotherPayer: boolean;
  setIsAnotherPayer: (value: boolean) => void;
  entrantData: Omit<Entrant, 'userId'> | null;
  setEntrantData: (value: Omit<Entrant, 'userId'>) => void;
  representativeData: Omit<PersonalData, 'userId'> | null;
  setRepresentativeData: (value: Omit<PersonalData, 'userId'>) => void;
  customerData: Omit<PersonalData, 'userId'> | null;
  setCustomerData: (value: Omit<PersonalData, 'userId'>) => void;
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
  const [isContract, setIsContract] = useState(true);

  const [entrantData, setEntrantData] = useState<Omit<
    Entrant,
    'userId'
  > | null>(null);
  const [representativeData, setRepresentativeData] = useState<Omit<
    PersonalData,
    'userId'
  > | null>(null);

  const [customerData, setCustomerData] = useState<Omit<
    PersonalData,
    'userId'
  > | null>(null);

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
        isContract,
        setIsContract,
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
