'use client';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface DeletePopupProps {
  popupController: (value: boolean) => void;
  deleteEntrant: () => Promise<void>;
}

export const DeletePopup: FC<DeletePopupProps> = ({
  popupController,
  deleteEntrant,
}) => (
  <div
    className='absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
    onClick={() => popupController(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className='m-auto flex w-[450px] flex-col items-center gap-4 rounded-md border border-slate-300 bg-slate-50 p-4 shadow-lg'
    >
      <p className='text-center text-xl'>Підтвердження особистих даних</p>
      <p className='text-center text-sm'>
        Підійдіть до волонтера для схвалення особистих даних
      </p>
      <div className='flex flex-row gap-2'>
        <Button variant='outline' onClick={() => popupController(false)}>
          Скасувати
        </Button>
        <Button onClick={deleteEntrant}>Надіслати</Button>
      </div>
    </div>
  </div>
);
