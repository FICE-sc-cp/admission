'use client';

import ProgressStepper from '@/app/(application)/personal-data/_components/progress-stepper/ProgressStepper';
import { useEffect, useState } from 'react';

const PersonalDataPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState<string[]>([]);

  const [isChild, setIsChild] = useState(true);
  const [isAnotherPayer, setIsAnotherPayer] = useState(false);

  useEffect(() => {
    const stepsArr = ['Інформація про вступника', 'Підтвердження даних'];
    if (isChild) {
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
  }, [isChild, isAnotherPayer]);

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      {/*<DataAlreadyExist />*/}
      <ProgressStepper
        isChild={isChild}
        isAnotherPayer={isAnotherPayer}
        activeStep={activeStep}
        steps={steps}
      />
    </main>
  );
};

export default PersonalDataPage;
