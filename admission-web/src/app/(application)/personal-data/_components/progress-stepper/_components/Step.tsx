import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

interface StepProps {
  activeStep: number;
  isCompleted: boolean;
  stepNumber: number;
  text: string;
  isLast: boolean;
}

const Step: FC<StepProps> = ({
  activeStep,
  isCompleted,
  stepNumber,
  text,
  isLast,
}) => {
  return (
    <div className='flex flex-col items-center gap-[12px]'>
      <div
        className={`relative w-fit rounded-[50%] border-2 ${activeStep === stepNumber ? 'border-violet-600' : 'border-slate-300'} bg-white p-1.5`}
      >
        <div
          className={`w-[30px] text-center text-xl ${activeStep === stepNumber ? 'text-violet-600' : 'text-slate-700'} `}
        >
          {stepNumber}
        </div>
        {!isLast && (
          <Separator
            orientation='horizontal'
            className='absolute left-[40px] top-[20px] z-[-1] h-[2px] w-[195px] bg-slate-300'
          />
        )}
      </div>
      <p className='text-sm'>{text}</p>
    </div>
  );
};

export default Step;
