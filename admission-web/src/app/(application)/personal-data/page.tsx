'use client';

import { Loader } from '@/components/common/components/Loader';
import CustomerPage from '@/components/pages/entrant/personal-data/components/CustomerPage';
import EntrantForm from '@/components/pages/entrant/personal-data/components/EntrantForm';
import ProgressStepper from '@/components/pages/entrant/personal-data/components/ProgressStepper';
import RepresentativePage from '@/components/pages/entrant/personal-data/components/RepresentativePage';
import SubmitPage from '@/components/pages/entrant/personal-data/components/SubmitPage';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import useAuth from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import DataAlreadyExist from '@/components/pages/entrant/personal-data/components/DataAlreadyExist';

const PersonalDataPage = () => {
  const { isAdult, isAnotherPayer, activeStep } = usePersonalDataContext();
  const [steps, setSteps] = useState<string[]>([]);
  const { toastError } = useCommonToast();
  const [loading, setLoading] = useState(true);
  const [isAlreadyFilled, setIsAlreadyFilled] = useState(true);

  const { user, loading: userLoading } = useAuth();

  const getUserPersonalData = async (userId: string) => {
    try {
      const { data } = await PersonalDataApi.getPersonalData(userId);
      setIsAlreadyFilled(data.entrantData !== null);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      getUserPersonalData(user.id);
    }
  }, [user]);

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

  if (loading || userLoading) {
    return <Loader />;
  }

  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 lg:gap-6 lg:p-6'>
      {isAlreadyFilled ? (
        <DataAlreadyExist />
      ) : (
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
      )}
    </main>
  );
};

export default PersonalDataPage;
