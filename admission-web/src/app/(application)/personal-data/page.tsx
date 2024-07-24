'use client';

import ProgressStepper from '@/app/(application)/personal-data/_components/progress-stepper/ProgressStepper';
import { useState } from 'react';

const PersonalDataPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      {/*<DataAlreadyExist />*/}
      <ProgressStepper
        isChild={true}
        isAnotherPayer={true}
        activeStep={activeStep}
      />
    </main>
  );
};

export default PersonalDataPage;
