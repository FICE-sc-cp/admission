'use client';

import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
  Form,
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
  IPrioritySelect,
  TDocumentsSchema,
} from '@/lib/schemas-and-types/documents';
import { EducationProgramLabels } from '@/lib/constants/documents-educational-programs';

interface PriorityFormProps {
  educationalPrograms: IPrioritySelect[];
  form: UseFormReturn<TDocumentsSchema, any, undefined>;
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
                    //@ts-ignore
                    program: EducationProgramLabels[value],
                  });
                }}
                //@ts-ignore
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='w-[320px] md:w-[511px]'>
                    <SelectValue placeholder='Вибери зі списку' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[320px] md:w-auto'>
                  {educationalPrograms.map((priority) => (
                    <SelectItem value={priority.label} key={priority.id}>
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
              className='w-[320px] md:w-[511px]'
              disabled
            />
          </FormItem>
        )}
      />
    </>
  );
};

export default PriorityForm;
