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
  TAdminDocumentsSchema,
  TDocumentsSchema,
} from '@/lib/schemas-and-types/documents';
import {
  EducationProgramAbbreviation,
  EducationProgramLabels,
} from '@/lib/constants/documents-educational-programs';

interface PriorityFormProps {
  educationalPrograms: IPrioritySelect[];
  form: UseFormReturn<TAdminDocumentsSchema, any, undefined>;
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
                value={
                  field.value
                    ? EducationProgramAbbreviation[field.value.program]
                    : field.value
                }
              >
                <FormControl>
                  <SelectTrigger className='w-[320px] md:w-[350px]'>
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
              className='w-[320px] md:w-[350px]'
              disabled
            />
          </FormItem>
        )}
      />
    </>
  );
};

export default PriorityForm;
