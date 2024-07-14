'use client';
import EntrantInfo from './entrant-info';
import RepresentativeInfo from './representative-info';

import { FormProvider, useForm } from 'react-hook-form';
import { StepperFormValues } from './constants-and-types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import StepperIndicator from '../stepper-indicator';
// import { toast } from "../ui/use-toast";

import { StepperFormKeys } from './constants-and-types';
// import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <></>;
    case 2:
      return <EntrantInfo />;
    case 3:
      return <RepresentativeInfo />;
    default:
      return 'Unknown step';
  }
}

const HookMultiStepForm = () => {
  const [erroredInputName, setErroredInputName] = useState('');
  const methods = useForm<StepperFormValues>({ mode: 'all' });
  const [activeStep, setActiveStep] = useState(1);

  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const [stepsArray, setStepsArray] = useState([
    {
      index: 1,
      title: 'Загальна інформація',
    },
    {
      index: 2,
      title: 'Інформація про вступника',
    },
    {
      index: 3,
      title: 'Підтвердження даних',
    },
  ]);

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName('');
    }
  }, [erroredInputName]);

  const onSubmit = async (formData: StepperFormValues) => {
    console.log({ formData });
    // simulate api call
    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     // resolve({
    //     //   title: "Success",
    //     //   description: "Form submitted successfully",
    //     // });
    //     reject({
    //       message: 'There was an error submitting form',
    //       // message: "Field error",
    //       // errorKey: "fullName",
    //     });
    //   }, 2000);
    // })
    //   .then(({ title, description }) => {
    //     toast({
    //       title,
    //       description,
    //     });
    //   })
    //   .catch(({ message: errorMessage, errorKey }) => {
    //     if (
    //       errorKey &&
    //       Object.values(StepperFormKeys)
    //         .flatMap((fieldNames) => fieldNames)
    //         .includes(errorKey)
    //     ) {
    //       let erroredStep: number;
    //       // get the step number based on input name
    //       for (const [key, value] of Object.entries(StepperFormKeys)) {
    //         if (value.includes(errorKey as never)) {
    //           erroredStep = Number(key);
    //         }
    //       }
    //       // set active step and error
    //       setActiveStep(erroredStep);
    //       setError(errorKey as StepperFormKeysType, {
    //         message: errorMessage,
    //       });
    //       setErroredInputName(errorKey);
    //     } else {
    //       setError('root.formError', {
    //         message: errorMessage,
    //       });
    //     }
    //   });
  };

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='flex flex-col items-center'>
      <StepperIndicator stepsArray={stepsArray} activeStep={activeStep} />
      <FormProvider {...methods}>
        <form
          noValidate
          className='max-sm:w-full sm:w-[380px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          {getStepContent(activeStep)}
          <div className='flex justify-center space-x-[20px]'>
            <Button
              type='button'
              className='w-[100px]'
              variant='secondary'
              onClick={handleBack}
              disabled={activeStep === 1}
            >
              Back
            </Button>
            {activeStep === 5 ? (
              <Button
                className='w-[100px]'
                type='button'
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            ) : (
              <Button type='button' className='w-[100px]' onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default HookMultiStepForm;
