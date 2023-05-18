import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, useAppSelector } from '../../redux/type';

import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
// import { DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styled from '@emotion/styled';

import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  middleNameValidation,
  phoneValidation,
} from '../../utils/formValidation';

type Inputs = {
  firstName: string;
  middleName: string;
  lastName: string;
  groupId: string;
  professionId: string;
  email: string;
  phone: string;
  birthday: Date | null;
  photo: FileList;
};

export default function EmployeeForm() {
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);

  console.log('|______|  professions:', professions);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/employees`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();

        console.log('|______|  responseData:', responseData);
        reset();
        // navigate('/');
      } else {
        console.error(`Error: ${response.status}`);
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        // reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderColor: 'divider',
        p: 2,
        width: '400px',
        gap: 1,
        marginTop: '100px',
        marginLeft: '50px',
      }}
    >
      <TextField
        {...register('firstName', firstNameValidation)}
        label="Имя"
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
      />
      <TextField
        {...register('middleName', middleNameValidation)}
        label="Отчество"
        error={Boolean(errors.middleName)}
        helperText={errors.middleName?.message}
      />
      <TextField
        {...register('lastName', lastNameValidation)}
        label="Фамилия"
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
      />

      <FormControl error={Boolean(errors.groupId)} sx={{ flexGrow: 1 }}>
        <InputLabel id="group-label">Отдел</InputLabel>
        <Select {...register('groupId', { required: true })} label="Отдел">
          {groups.map((group) => (
            <MenuItem value={group.title} key={group.id}>
              {group.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.groupId?.message}</FormHelperText>
      </FormControl>

      <FormControl error={Boolean(errors.professionId)} sx={{ flexGrow: 1 }}>
        <InputLabel id="profession-label">Должность</InputLabel>
        <Select {...register('professionId', { required: true })} label="Должность">
          {professions.map((profession) => (
            <MenuItem value={profession.position} key={profession.id}>
              {profession.position}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.professionId?.message}</FormHelperText>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <TextField
          {...register('email', emailValidation)}
          label="Почта"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          {...register('phone', phoneValidation)}
          label="Телефон"
          type="tel"
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      <Button type="submit" variant="outlined" sx={{ width: '200px' }}>
        Добавить сотрудника
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  );
}
