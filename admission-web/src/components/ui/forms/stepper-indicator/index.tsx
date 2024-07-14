import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import React, { Fragment } from 'react';

interface StepperIndicatorProps {
  activeStep: number;
  stepsArray: { index: number; title: string }[];
}

const StepperIndicator = ({
  activeStep,
  stepsArray,
}: StepperIndicatorProps) => {
  return (
    <div className='relative z-[-1] mb-16 flex items-center justify-center'>
      {stepsArray.map(({ index, title }) => (
        <Fragment key={index}>
          <div
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full border-[2px] md:h-12 md:w-12',
              index < activeStep && 'bg-primary text-white',
              index === activeStep && 'border-primary text-primary'
            )}
          >
            {index >= activeStep ? index : <Check className='h-5 w-5' />}
            <p
              className={`absolute top-16 hidden overflow-hidden whitespace-nowrap text-center md:block ${index < activeStep ? 'text-black' : ''}`}
            >
              {title}
            </p>
          </div>
          {index !== stepsArray.length && (
            <Separator
              orientation='horizontal'
              className={clsx(
                'h-[2px] w-14 md:w-40',
                index <= activeStep - 1 && 'bg-primary'
              )}
            />
          )}
        </Fragment>
      ))}

      <p
        className={`absolute top-16 hidden overflow-hidden whitespace-nowrap font-medium uppercase text-primary max-md:block`}
      >
        {stepsArray[activeStep - 1].title}
      </p>
    </div>
  );
};

function createArray(stepNumber: number): number[] {
  const result: number[] = [];
  let current = 1;
  while (current <= stepNumber) {
    result.push(current);
    current += 1; // Adjust this step increment if necessary
  }
  return result;
}

export default StepperIndicator;
