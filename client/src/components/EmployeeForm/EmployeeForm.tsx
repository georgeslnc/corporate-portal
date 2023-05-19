import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputs } from './types';

import { Box, TextField, Button, Alert } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'date-fns/locale/ru';
import { addYears } from 'date-fns';

import { dateFormatter } from '../../utils/formatterHelpers';
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  middleNameValidation,
  phoneValidation,
} from '../../utils/formValidation';
import ProfFormControl from './ProfFormControl';

const minDate = new Date(1930, 0, 1);
const maxDate = addYears(new Date(), -18);

export default function EmployeeForm() {
  const [selectedDate, handleDateChange] = useState<Date | null>(maxDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    data = { ...data, birthday: selectedDate ? dateFormatter(selectedDate) : '' };

    try {
      const res = await fetch(`http://localhost:3000/admin/employees`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const data = await res.json();
        setAlertMessage(data.message);
        reset();
        handleDateChange(maxDate);

        setTimeout(() => {
          setAlertMessage('');
        }, 6 * 1000);
      } else {
        console.error(`Error: ${res.status}`);
        const errorData = await res.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
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
        <ProfFormControl register={register} errors={errors} reset={reset} />
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
        <DatePicker
          label="Дата рождения"
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
        {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
      </Box>
    </LocalizationProvider>
  );
}
