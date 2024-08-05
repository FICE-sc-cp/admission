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
import { EducationProgram } from '$/utils/src/enums/EducationalProgramEnum';
import { DocumentState } from '$/utils/src/enums/DocumentStateEnum';

interface PriorityFormProps {
  educationalPrograms: {
    label: string;
    id: EducationProgram;
  }[];
  form: UseFormReturn<TAdminDocumentsSchema | TDocumentsSchema, any, undefined>;
  priorityState?: DocumentState;
}

const PriorityForm: FC<PriorityFormProps> = ({
  educationalPrograms,
  priorityState,
  form,
}) => {
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
                Пріоритет {index + 1}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange({
                    number: index + 1,
                    program: value,
                  });
                }}
                value={field.value ? field.value.program : ''}
                disabled={priorityState === DocumentState.APPROVED}
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
              value={field.value ?? ''}
              className='w-[320px] md:w-[350px]'
              disabled={priorityState === DocumentState.APPROVED}
            />
          </FormItem>
        )}
      />
    </>
  );
};

export default PriorityForm;
