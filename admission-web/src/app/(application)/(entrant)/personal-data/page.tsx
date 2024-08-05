'use client';

import CustomerPage from '@/components/pages/entrant/personal-data/components/CustomerPage';
import EntrantForm from '@/components/pages/entrant/personal-data/components/EntrantForm';
import ProgressStepper from '@/components/pages/entrant/personal-data/components/ProgressStepper';
import RepresentativePage from '@/components/pages/entrant/personal-data/components/RepresentativePage';
import SubmitPage from '@/components/pages/entrant/personal-data/components/SubmitPage';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import useAuth from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import DataAlreadyExist from '@/components/pages/entrant/personal-data/components/DataAlreadyExist';
import { LoadingPage } from '@/components/common/components/LoadingPage';
import { useQuery } from '@tanstack/react-query';

const PersonalDataPage = () => {
  const { isAdult, isAnotherPayer, activeStep } = usePersonalDataContext();
  const [steps, setSteps] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const stepsArr = ['Інформація про вступника', 'Підтвердження даних'];
    if (!isAdult) {
      stepsArr.splice(1, 0, 'Законний представник');
    }
    if (isAnotherPayer) {
      if (stepsArr.length === 3) {
        stepsArr.splice(2, 0, 'Інформація про платника');
      } else {
        stepsArr.splice(1, 0, 'Інформація про платника');
      }
    }
    setSteps(stepsArr);
  }, [isAdult, isAnotherPayer]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['personal-data', user && user.id],
    queryFn: () => user && PersonalDataApi.getPersonalData(user.id),
    select: (data) => data?.data,
    throwOnError: false,
  });

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 lg:gap-6 lg:p-6'>
      {userData?.entrantData === null ? (
        <>
          <ProgressStepper activeStep={activeStep} steps={steps} />
          {activeStep === 1 && <EntrantForm />}
          {steps[activeStep - 1] === 'Законний представник' && (
            <RepresentativePage />
          )}
          {steps[activeStep - 1] === 'Інформація про платника' && (
            <CustomerPage />
          )}
          {activeStep === steps.length && <SubmitPage />}
        </>
      ) : (
        <DataAlreadyExist />
      )}
    </main>
  );
};

export default PersonalDataPage;
