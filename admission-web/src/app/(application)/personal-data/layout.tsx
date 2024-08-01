'use client';

import { FC } from 'react';
import { PersonalDataContextProvider } from '@/lib/contexts/PersonalDataContext';

interface PersonalDataLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<PersonalDataLayoutProps> = ({ children }) => {
  return <PersonalDataContextProvider>{children}</PersonalDataContextProvider>;
};

export default ApplicationLayout;
