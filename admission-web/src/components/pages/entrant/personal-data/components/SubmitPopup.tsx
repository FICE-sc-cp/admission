'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface SubmitPopupProps {
  onSubmit: () => void;
  popupController: (value: ((prevState: boolean) => boolean) | boolean) => void;
  adminCodeController: (value: string) => void;
  adminCode: string;
}

const SubmitPopup: FC<SubmitPopupProps> = ({
  onSubmit,
  popupController,
  adminCodeController,
  adminCode,
}) => {
  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
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
        <Input
          value={adminCode}
          onChange={(e) => adminCodeController(e.target.value)}
        />
        <div className='flex flex-row gap-2'>
          <Button variant='outline' onClick={() => popupController(false)}>
            Скасувати
          </Button>
          <Button onClick={onSubmit} disabled={adminCode !== '714'}>
            Надіслати
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPopup;
