import * as React from 'react';

import { cn } from '@/lib/cn';

interface LabelWrapperProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
  direction?: 'col' | 'row';
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputWithLabelProps extends InputProps {
  error?: string;
  label: string;
}

export function LabelWrapper({
  label,
  children,
  className,
  error,
  direction = 'col',
}: LabelWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label>{label}</label>
      <div>
        {children}

        {error && (
          <span className='!mt-[5px] block text-[12px] text-destructive'>
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(({ label, error, ...other }, ref) => {
  return (
    <LabelWrapper label={label} error={error}>
      <Input {...other} ref={ref} />
    </LabelWrapper>
  );
});

InputWithLabel.displayName = 'InputWithLabel';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
