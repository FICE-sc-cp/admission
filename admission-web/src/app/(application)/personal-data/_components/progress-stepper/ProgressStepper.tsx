'use client';

import { FC } from 'react';
import Step from '@/app/(application)/personal-data/_components/progress-stepper/_components/Step';
import { Separator } from '@/components/ui/separator';

interface ProgressStepperProps {
  activeStep: number;
  steps: string[];
}

const ProgressStepper: FC<ProgressStepperProps> = ({ activeStep, steps }) => {
  return (
    <>
      <div className='mt-7 flex items-center justify-center gap-10 md:mt-0 md:gap-[58px]'>
        {steps?.map((step, index) => (
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
      <p className='mt-4 block uppercase text-violet-800 md:hidden'>
        {steps[activeStep - 1]}
      </p>
      <Separator orientation='horizontal' className='bg-gray-300' />
    </>
  );
};

export default ProgressStepper;
