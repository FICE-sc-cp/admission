import { FC } from 'react';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

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
        className={`relative w-fit rounded-[50%] border-2 ${activeStep === stepNumber || isCompleted ? 'border-violet-600' : 'border-slate-300'} ${isCompleted ? 'bg-violet-600' : ''} bg-white p-1.5`}
      >
        <div
          className={`flex w-[30px] flex-col items-center text-center text-xl ${activeStep === stepNumber ? 'text-violet-600' : 'text-slate-700'} `}
        >
          {isCompleted ? <Check className='h-7 w-8 text-white' /> : stepNumber}
        </div>
        {!isLast && (
          <Separator
            orientation='horizontal'
            className={`${isCompleted ? 'bg-violet-500' : 'bg-slate-300'} absolute left-[40px] top-[20px] z-[-1] h-[2px] w-[195px]`}
          />
        )}
      </div>
      <p className='text-sm'>{text}</p>
    </div>
  );
};

export default Step;
