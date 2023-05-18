import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, useAppSelector } from '../../redux/type';

import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ru from 'date-fns/locale/ru';
import { addYears } from 'date-fns';

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
  phoneNumber: string;
  birthday: string | Date;
  photo: FileList;
};

const minDate = new Date(1930, 0, 1); // 1 Января 1900 года
const maxDate = addYears(new Date(), -18);

export default function EmployeeForm() {
  const [selectedDate, handleDateChange] = useState<Date | null>(maxDate);
  const [errorMessage, setErrorMessage] = useState('');

  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      groupId: '',
      professionId: '',
      email: '',
      phoneNumber: '',
      birthday: '',
      photo: null || undefined,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // handleDateChange((prev) => cleanText(prev));

    data = { ...data, birthday: selectedDate ? selectedDate.toISOString().slice(0, 10) : '' };
    console.log('|______|  data:', data);
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
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
            {...register('phoneNumber', phoneValidation)}
            label="Телефон"
            type="tel"
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        {/* selectedDate, handleDateChange */}
        <DatePicker
          label="Дата рождения"
          slotProps={{
            textField: {
              helperText: 'ДД/ММ/ГГГГ',
            },
          }}
          minDate={minDate}
          maxDate={maxDate}
          value={selectedDate}
          onChange={(newValue) => {
            if (newValue !== null) {
              handleDateChange(newValue);
            }
          }}
        />

        <Button type="submit" variant="outlined" sx={{ width: '200px' }}>
          Добавить сотрудника
        </Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Box>
    </LocalizationProvider>
  );
}
