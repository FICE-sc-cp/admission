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
}

const PersonalDataContext = createContext<ContextProps | undefined>(undefined);

const PersonalDataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdult, setIsAdult] = useState(true);
  const [isAnotherPayer, setIsAnotherPayer] = useState(false);

  return (
    <PersonalDataContext.Provider
      value={{ isAdult, setIsAdult, isAnotherPayer, setIsAnotherPayer }}
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
