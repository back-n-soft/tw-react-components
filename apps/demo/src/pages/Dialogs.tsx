import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card,
  ConfirmDialog,
  Dialog,
  Flex,
  FormDialog,
  FormInputs,
  ListSorterDialog,
  PdfViewerDialog,
} from 'tw-react-components';

type Login = {
  email: string;
  password: string;
};

export const Dialogs: FC = () => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const form = useForm<Login>({ defaultValues: {} });

  const toggleDialog = (dialog: string) => () =>
    setOpenDialogs((state) => ({ ...state, [dialog]: !state[dialog] }));

  const handleConfirmDialog = (action: string) => () => {
    alert(`${action} clicked!`);
    toggleDialog('confirm')();
  };

  const handleLogin = (login: Login) => {
    alert(JSON.stringify(login, null, 2));
    toggleDialog('form')();
  };

  const handleSorter = (items: string[]) => {
    alert(JSON.stringify(items, null, 2));
    toggleDialog('sorter')();
  };

  return (
    <>
      <Card fullWidth>
        <Button onClick={toggleDialog('simple')}>Simple dialog</Button>
        <Dialog
          isOpen={openDialogs['simple']}
          title="Simple Dialog"
          onClose={toggleDialog('simple')}
        >
          Your payment has been successfully submitted. We’ve sent you an email with all of the
          details of your order.
        </Dialog>
      </Card>
      <Card fullWidth>
        <Button onClick={toggleDialog('confirm')}>Confirm dialog</Button>
        <ConfirmDialog
          isOpen={openDialogs['confirm']}
          title="Confirm Dialog"
          onClose={handleConfirmDialog('No')}
          onConfirm={handleConfirmDialog('Yes')}
        >
          Are you sure you want to delete this item?
        </ConfirmDialog>
      </Card>
      <Card fullWidth>
        <Button onClick={toggleDialog('form')}>Form dialog</Button>
        <FormDialog
          title="Form Dialog"
          form={form}
          onSubmit={handleLogin}
          isOpen={openDialogs['form']}
          onClose={toggleDialog('form')}
          extraAction={<Button>Action</Button>}
        >
          <Flex direction="column" fullWidth>
            <FormInputs.Text name="username" label="Username" required />
            <FormInputs.Password name="password" label="Password" required />
          </Flex>
        </FormDialog>
      </Card>
      <Card fullWidth>
        <Button onClick={toggleDialog('pdf')}>Pdf dialog</Button>
        <PdfViewerDialog
          title="Pdf Dialog"
          url="https://www.orimi.com/pdf-test.pdf"
          isOpen={openDialogs['pdf']}
          onClose={toggleDialog('pdf')}
        />
      </Card>
      <Card fullWidth>
        <Button onClick={toggleDialog('sorter')}>Sorter dialog</Button>
        <ListSorterDialog
          title="Sorter Dialog"
          isOpen={openDialogs['sorter']}
          items={['one', 'two', 'three']}
          renderer={(item) => <>{item}</>}
          idResolver={(item) => item}
          onSubmit={handleSorter}
          onClose={toggleDialog('sorter')}
        />
      </Card>
    </>
  );
};
