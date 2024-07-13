import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { firstStepRadioGroups } from '@/components/ui/forms/contract-form/constants';

const FirstStep = () => {
  return (
    <div className='gap flex w-fit flex-col items-center justify-center gap-[24px] md:gap-[28px]'>
      {firstStepRadioGroups.map((group) => (
        <RadioGroup
          className='flex flex-col gap-[10px] self-start font-[500]'
          key={group.heading}
        >
          <h3 className='text-[16px] md:text-[20px]'>{group.heading}</h3>
          {group.options.map((option) => (
            <div
              key={option}
              className='flex items-center space-x-[8px] text-[14px]'
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      ))}
    </div>
  );
};

export default FirstStep;
