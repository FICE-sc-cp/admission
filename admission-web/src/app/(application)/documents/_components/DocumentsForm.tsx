'use client';

import {
  DocumentsSchema,
  TDocumentsSchema,
} from '@/schemas-and-types/documents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PriorityForm from '@/app/(application)/documents/_components/PriorityForm';
import {
  IPeduPrograms,
  ISTeduPrograms,
} from '@/constants/priority-select-values';

export const DocumentsForm = () => {
  const form = useForm<TDocumentsSchema>({
    resolver: zodResolver(DocumentsSchema),
  });

  const onSubmit = (data: TDocumentsSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='degree'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Освітній рівень(бакалавр/магістр)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Bachelor' />
                    </FormControl>
                    <FormLabel>Бакалавр</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Master' />
                    </FormControl>
                    <FormLabel>Магістр</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fundingSource'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Джелело фінансування</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Budget' />
                    </FormControl>
                    <FormLabel>Бюджет</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Contract' />
                    </FormControl>
                    <FormLabel>Контракт</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='studyForm'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Форма навчання (денна/заочна)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Full_time' />
                    </FormControl>
                    <FormLabel>Денна</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='Part_time' />
                    </FormControl>
                    <FormLabel>Заочна</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues('fundingSource') === 'Contract' && (
          <FormField
            control={form.control}
            name='paymentType'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Тип оплати</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Щоквартально' />
                      </FormControl>
                      <FormLabel>Щоквартально</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Щосеместрово' />
                      </FormControl>
                      <FormLabel>Щосеместрово</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Щомісячно' />
                      </FormControl>
                      <FormLabel>Щомісячно</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues('degree') !== 'Master' && (
          <FormField
            control={form.control}
            name='specialty'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Спеціальність</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='121 Інженерія програмного забезпечення' />
                      </FormControl>
                      <FormLabel>
                        121 Інженерія програмного забезпечення
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='123 Комп’ютерна інженерія' />
                      </FormControl>
                      <FormLabel>123 Комп’ютерна інженерія</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='126 Інформаційні системи та технології' />
                      </FormControl>
                      <FormLabel>
                        126 Інформаційні системи та технології
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues('specialty') ===
          '121 Інженерія програмного забезпечення' && (
          <PriorityForm educationalPrograms={IPeduPrograms} />
        )}
        {form.getValues('specialty') ===
          '126 Інформаційні системи та технології' && (
          <PriorityForm educationalPrograms={ISTeduPrograms} />
        )}
        <Button type='submit' className='w-[185px]'>
          Надіслати договір
        </Button>
      </form>
    </Form>
  );
};
