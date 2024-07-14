import { kyiv, REGIONS, StepperFormValues } from './constants-and-types';
import { Controller, useFormContext } from 'react-hook-form';

import { InputWithLabel, LabelWrapper, Input } from '@/components/ui/input';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerSingle } from '@/components/ui/date-picker-single';

const PersonInfo = ({ type }: { type: 'entrant' | 'representative' }) => {
  const {
    setValue,
    control,
    watch,
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  const isIdCodeAbsent = watch(`${type}$idCodeAbsent`);
  const region = watch(`${type}$region`);

  //TODO: add valid field names later on
  return (
    <div>
      <h4 className='stepper_step_heading'></h4>
      <div className='flex flex-col gap-4'>
        <InputWithLabel
          label='Номер телефону'
          placeholder='+380 000 000 000'
          {...register(`${type}$phoneNumber`, { required: 'Required' })}
          error={errors[`${type}$phoneNumber`]?.message}
        />
        <InputWithLabel
          label='Номер паспорту'
          placeholder='Номер паспорту'
          {...register(`${type}$passportNumber`, { required: 'Required' })}
          error={errors[`${type}$passportNumber`]?.message}
        />
        <Controller
          name={`${type}$passportDate`}
          control={control}
          rules={{ required: 'Required' }}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { invalid, error },
          }) => (
            <LabelWrapper label='Дата видачі паспорту' error={error?.message}>
              <DatePickerSingle
                placeholder='17.11.2022'
                onSelect={onChange}
                selectedDate={value ? new Date(value) : undefined}
                onBlur={onBlur}
              />
            </LabelWrapper>
          )}
        />
        <InputWithLabel
          label='Орган, що видав паспорт'
          placeholder='Орган видачі'
          {...register(`${type}$passportInstitute`, { required: 'Required' })}
          error={errors[`${type}$passportInstitute`]?.message}
        />
        <div className='flex flex-col gap-y-2.5'>
          {!isIdCodeAbsent && (
            <InputWithLabel
              label='Індифікаційний код'
              placeholder='Індифікаційний код'
              {...register(
                `${type}$idCode`,
                !isIdCodeAbsent ? { required: 'Required' } : {}
              )}
              error={errors[`${type}$idCode`]?.message}
            />
          )}
          <Controller
            name={`${type}$idCodeAbsent`}
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { invalid, error },
            }) => (
              <Checkbox
                label='Відсутній індифікаційний код'
                checked={!!value}
                onCheckedChange={(...args) => {
                  onChange(...args);
                  setValue(`${type}$idCode`, undefined);
                }}
                className='flex items-center'
              />
            )}
          />
        </div>

        <Controller
          name={`${type}$region`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <LabelWrapper
              label='Регіон'
              error={errors[`${type}$region`]?.message}
            >
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Виберіть зі списку' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {REGIONS.map(({ value, label }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelWrapper>
          )}
        />

        {region !== kyiv && (
          <InputWithLabel
            label='Населений пункт'
            placeholder='м. Київ'
            {...register(`${type}$settlement`, { required: 'Required' })}
            error={errors[`${type}$settlement`]?.message}
          />
        )}

        <InputWithLabel
          label='Адреса'
          placeholder='вул. Академіка Янгеля 20'
          {...register(`${type}$address`, { required: 'Required' })}
          error={errors[`${type}$address`]?.message}
        />

        <InputWithLabel
          label='Поштовий індекс'
          placeholder='12345'
          {...register(`${type}$index`, { required: 'Required' })}
          error={errors[`${type}$index`]?.message}
        />
      </div>
    </div>
  );
};

export default PersonInfo;
