import { RootState, useAppSelector } from '../../redux/type';
import { UseFormRegister, DeepMap, FieldError } from 'react-hook-form';
import { FormInputs } from './types';

import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
type Props = {
  register: UseFormRegister<FormInputs>;
  errors: DeepMap<FormInputs, FieldError>;
  reset: ResetHandler<FormInputs>;
};

export default function ProfFormControl({ register, errors, reset }: Props) {
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);

  return (
    <>
      <FormControl error={Boolean(errors.groupTitle)} sx={{ flexGrow: 1 }}>
        <InputLabel id="group-label">Отдел</InputLabel>
        <Select {...register('groupTitle', { required: true })} label="Отдел" defaultValue="">
          {groups.map((group) => (
            <MenuItem value={group.title} key={group.id}>
              {group.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.groupTitle?.message}</FormHelperText>
      </FormControl>
      <FormControl error={Boolean(errors.profession)} sx={{ flexGrow: 1 }}>
        <InputLabel id="profession-label">Должность</InputLabel>
        <Select {...register('profession', { required: true })} label="Должность" defaultValue="">
          {professions.map((profession) => (
            <MenuItem value={profession.position} key={profession.id}>
              {profession.position}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.profession?.message}</FormHelperText>
      </FormControl>
    </>
  );
}
