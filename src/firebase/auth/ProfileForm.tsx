import React, { FC, useState, ChangeEvent } from 'react';
import { Input, Button } from '../../native';
import theme from '../../theme.module.scss';

export interface FormDTO {
  displayName: string;
}

interface FormProps {
  initialValues: FormDTO;
  onSubmit: (form: FormDTO) => void;
}

const formStyles = {
  backgroundColor: theme.primary,
  padding: '10%',
  borderRadius: '3px',
  boxShadow: '2px 2px 5px grey',
};

export const ProfileForm: FC<FormProps> = ({ initialValues, onSubmit }) => {
  const [displayName, setDisplayName] = useState(initialValues.displayName);

  return (
    <form
      style={formStyles}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ displayName });
      }}
    >
      <label htmlFor="displayName">Set your username</label>
      <Input
        placeholder="Username"
        name="displayName"
        value={displayName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setDisplayName(event.currentTarget.value)
        }
      />
      <Button>Submit</Button>
    </form>
  );
};
