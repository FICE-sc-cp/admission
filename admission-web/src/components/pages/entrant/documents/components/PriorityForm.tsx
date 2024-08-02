'use client';

import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import {
  TAdminDocumentsSchema,
  TDocumentsSchema,
} from '@/lib/schemas/documents.schemas';
import { EducationProgramAbbreviation } from '@/lib/constants/educational-programs';
import { EducationProgram } from '$/utils/src/enums/EducationalProgramEnum';

interface PriorityFormProps {
  educationalPrograms: {
    label: string;
    id: EducationProgram;
  }[];
  form: UseFormReturn<TAdminDocumentsSchema | TDocumentsSchema, any, undefined>;
}

const PriorityForm: FC<PriorityFormProps> = ({ educationalPrograms, form }) => {
  return (
    <>
      {educationalPrograms.map((priority, index) => (
        <FormField
          key={priority.id}
          control={form.control}
          name={`priorities.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>
                Приорітет {index + 1}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange({
                    number: index,
                    program: value,
                  });
                }}
                value={field.value ? field.value.program : ''}
              >
                <FormControl>
                  <SelectTrigger className='w-[320px] md:w-[350px]'>
                    <SelectValue placeholder='Вибери зі списку' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[320px] md:w-auto'>
                  {educationalPrograms.map((priority) => (
                    <SelectItem value={priority.id} key={priority.id}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <FormField
        control={form.control}
        name='priorityDate'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-normal'>
              Дата заповнення
            </FormLabel>
            <Input
              type='text'
              value={field.value}
              className='w-[320px] md:w-[350px]'
            />
          </FormItem>
        )}
      />
    </>
  );
};

export default PriorityForm;
