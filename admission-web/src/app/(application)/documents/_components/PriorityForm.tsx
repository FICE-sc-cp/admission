'use client';

import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import {
  IPrioritySelect,
  priorityFormSchema,
  TPriorityForm,
} from '@/schemas-and-types/priority';

interface PriorityFormProps {
  educationalPrograms: IPrioritySelect[];
}

const PriorityForm: FC<PriorityFormProps> = ({ educationalPrograms }) => {
  const form = useForm<z.infer<TPriorityForm>>({
    resolver: zodResolver(priorityFormSchema),
    defaultValues: {
      date: getCurrentDate(),
    },
  });

  function onSubmit(data: z.infer<TPriorityForm>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-[10px] md:items-start md:justify-start'
      >
        {educationalPrograms.map((priority, index) => (
          <FormField
            key={priority.id}
            control={form.control}
            name={`priority_${index + 1}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-normal'>
                  Приорітет {index + 1}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
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
          name='date'
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
        <Button
          type='submit'
          className='mt-[24px] w-[320px] md:w-[116px]'
          disabled={form.formState.isSubmitSuccessful}
        >
          Схвалити
        </Button>
      </form>
    </Form>
  );
};

export default PriorityForm;
