import { PropsWithChildren, ReactNode, useId } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import { Button } from '../Button';
import { Dialog } from './Dialog';

type Props<T extends FieldValues> = {
  className?: string;
  open: boolean;
  title: ReactNode;
  form: UseFormReturn<T>;
  submitLabel?: string;
  cancelLabel?: string;
  extraAction?: ReactNode;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onClose: () => void;
};

export const FormDialog = <T extends FieldValues>({
  className,
  open,
  title,
  form,
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  extraAction,
  onSubmit,
  onInvalid,
  onClose,
}: PropsWithChildren<Props<T>>) => {
  const id = useId();

  const handleSubmit: SubmitHandler<T> = async (data, event) => {
    try {
      await onSubmit(data, event);
    } catch {
      // do nothering
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content
        className={className}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        <FormProvider {...form}>
          <form id={`form-${id}`} onSubmit={form.handleSubmit(handleSubmit, onInvalid)}>
            {children}
          </form>
        </FormProvider>
        <Dialog.Footer className="w-full sm:justify-between">
          {extraAction}
          <Dialog.Footer className="ml-auto">
            <Dialog.Close asChild>
              <Button color="red">{cancelLabel}</Button>
            </Dialog.Close>
            <Button
              color="green"
              type="submit"
              form={`form-${id}`}
              disabled={form.formState.isSubmitting}
            >
              {submitLabel}
            </Button>
          </Dialog.Footer>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
