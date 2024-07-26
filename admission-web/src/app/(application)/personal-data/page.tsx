'use client';

import ProgressStepper from '@/app/(application)/personal-data/_components/progress-stepper/ProgressStepper';
import { useEffect, useState } from 'react';
import EntrantForm from '@/app/(application)/personal-data/_components/EntrantForm';
import {
  PersonalDataContextProvider,
  usePersonalDataContext,
} from '$/admission-web/contexts/PersonalDataContext';
import SubmitPage from '@/app/(application)/personal-data/_components/SubmitPage';
import RepresentativePage from '@/app/(application)/personal-data/_components/RepresentativePage';
import CustomerPage from '@/app/(application)/personal-data/_components/CustomerPage';

const PersonalDataPage = () => {
  const { isAdult, isAnotherPayer, activeStep } = usePersonalDataContext();

  const [steps, setSteps] = useState<string[]>([]);

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

  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 lg:gap-6 lg:p-6'>
      {/*<DataAlreadyExist />*/}
      <ProgressStepper activeStep={activeStep} steps={steps} />
      {activeStep === 1 && <EntrantForm />}
      {steps[activeStep - 1] === 'Законний представник' && (
        <RepresentativePage />
      )}
      {steps[activeStep - 1] === 'Інформація про платника' && <CustomerPage />}
      {activeStep === steps.length && <SubmitPage />}
    </main>
  );
};

export default PersonalDataPage;
