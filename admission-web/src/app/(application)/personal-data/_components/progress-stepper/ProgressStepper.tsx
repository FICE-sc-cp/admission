'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import Step from '@/app/(application)/personal-data/_components/progress-stepper/_components/Step';
import { Separator } from '@/components/ui/separator';

interface ProgressStepperProps {
  isChild: boolean;
  isAnotherPayer: boolean;
  activeStep: number;
}

const ProgressStepper: FC<ProgressStepperProps> = ({
  isChild,
  isAnotherPayer,
  activeStep,
}) => {
  const [steps, setSteps] = useState<string[]>([]);

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
    <>
      <div className='flex items-center justify-center gap-[58px]'>
        {steps.map((step, index) => (
          <Step
            key={step}
            activeStep={activeStep}
            isCompleted={false}
            stepNumber={index + 1}
            text={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
      <Separator orientation='horizontal' className='bg-gray-300' />
    </>
  );
};

export default ProgressStepper;
