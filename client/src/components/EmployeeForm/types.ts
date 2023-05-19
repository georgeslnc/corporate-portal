import { UseFormRegister, DeepMap, FieldError } from 'react-hook-form';
import { SelectChangeEvent } from '@mui/material/Select';

export type FormInputs = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  groupTitle?: string;
  profession?: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  // photo: FileList;
};

export type ProfFormTypes = {
  register: UseFormRegister<FormInputs>;
  errors: DeepMap<FormInputs, FieldError>;
  selectedGroup: string;
  handleGroupChange: (event: SelectChangeEvent<string>) => void;
  selectedProfession: string;
  handleProfessionChange: (event: SelectChangeEvent<string>) => void;
};
