'use client';

import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { prioritySelectValues } from '@/constants/priority-select-values';
import { Input } from '@/components/ui/input';
import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import {
  priorityFormSchema,
  priorityFormType,
} from '@/schemas-and-types/priority';

const SelectForm: FC = () => {
  const form = useForm<priorityFormType>({
    resolver: zodResolver(priorityFormSchema),
    defaultValues: {
      date: getCurrentDate(),
    },
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  function onSubmit(data: priorityFormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-[10px] md:items-start md:justify-start'
      >
        {[0, 1, 2].map((_, index) => (
          <FormField
            key={Math.random() * 100}
            control={form.control}
            name={`priority_${index + 1}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-normal'>
                  Приорітет {index + 1}
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedValues([...selectedValues, value]);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[320px] md:w-[511px]'>
                      <SelectValue placeholder='Вибери зі списку' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {prioritySelectValues.map((priority) => (
                      <SelectItem
                        value={priority}
                        key={priority}
                        disabled={selectedValues.includes(priority)}
                      >
                        {priority}
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
          disabled={form.formState.isSubmitted}
        >
          Схвалити
        </Button>
      </form>
    </Form>
  );
};

export default SelectForm;
