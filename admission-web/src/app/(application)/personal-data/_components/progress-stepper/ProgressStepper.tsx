'use client';

import { FC } from 'react';
import Step from '@/app/(application)/personal-data/_components/progress-stepper/_components/Step';
import { Separator } from '@/components/ui/separator';

interface ProgressStepperProps {
  isChild: boolean;
  isAnotherPayer: boolean;
  activeStep: number;
  steps: string[];
}

const ProgressStepper: FC<ProgressStepperProps> = ({
  isChild,
  isAnotherPayer,
  activeStep,
  steps,
}) => {
  return (
    <>
      <div className='flex items-center justify-center gap-[58px]'>
        {steps &&
          steps.map((step, index) => (
            <Step
              key={step}
              activeStep={activeStep}
              isCompleted={index + 1 < activeStep}
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
