import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NoPersonalDataPopUp() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='mx-auto mb-52 flex max-w-[386px] flex-col items-center justify-center border-violet-300 bg-violet-50 shadow-lg sm:mb-32'>
        <CardHeader>
          <FilePlus2 className='h-[48px] w-[48px]' strokeWidth='1' />
        </CardHeader>
        <CardContent className='text-center text-xl font-normal sm:text-2xl'>
          Заповніть особисті дані для відображення їх в профілі
        </CardContent>
        <CardFooter className='flex-col gap-3'>
          <Button asChild variant='outline'>
            <Link href='/personal-data'>Заповнити особисті дані</Link>
          </Button>
          <Button asChild>
            <Link href='/queue'>Відразу увійти в чергу</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
