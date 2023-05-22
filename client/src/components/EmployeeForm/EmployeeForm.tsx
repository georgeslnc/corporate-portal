import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputs } from './types';

import { Box, TextField, Button, Alert, SelectChangeEvent, Input } from '@mui/material';

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(maxDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [fileAttached, setFileAttached] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  const fileInput = useRef();

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroup(event.target.value);
  };

  const handleProfessionChange = (event: SelectChangeEvent<string>) => {
    setSelectedProfession(event.target.value);
  };

  const handleResetClick = () => {
    setSelectedGroup('');
    setSelectedProfession('');
    reset();
    if (fileInput.current) {
      fileInput.current.value = '';
      setFileAttached(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileAttached(true);
    } else {
      setFileAttached(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    data = { ...data, birthday: selectedDate ? dateFormatter(selectedDate) : '' };

    const formData = new FormData();

    const file = fileInput.current.files[0];
    formData.append('photo', file);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const res = await fetch(`http://localhost:3000/admin/employees`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      if (data.status === 200) {
        setAlertMessage(data.message);
        setSelectedDate(maxDate);
        handleResetClick();

        setTimeout(() => {
          setAlertMessage('');
        }, 5 * 1000);
      } else {
        setErrorMessage(data.message);
        console.error(`Error: ${data.status}`);

        setTimeout(() => {
          setErrorMessage('');
        }, 5 * 1000);
      }
    } catch (error) {
      console.error('===> error', error);
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

        <ProfFormControl
          register={register}
          errors={errors}
          selectedGroup={selectedGroup}
          selectedProfession={selectedProfession}
          handleGroupChange={handleGroupChange}
          handleProfessionChange={handleProfessionChange}
        />

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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <DatePicker
            label="Дата рождения"
            minDate={minDate}
            maxDate={maxDate}
            value={selectedDate}
            sx={{ flexGrow: 1 }}
            onChange={(newValue) => {
              if (newValue !== null) {
                setSelectedDate(newValue);
              }
            }}
          />

          <Button
            variant={fileAttached ? 'contained' : 'outlined'}
            component="label"
            sx={{ flexGrow: 1 }}
            style={fileAttached ? { backgroundColor: 'cornflowerblue', color: 'white' } : {}}
          >
            Фото
            <input ref={fileInput} type="file" name="photo" hidden onChange={handleFileUpload} />
          </Button>
        </Box>

        {/* <input ref={fileInput} type="file" id="photo" name="photo" /> */}
        {/* disableUnderline */}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: '20px' }}>
          <Button type="submit" variant="outlined" sx={{ flexGrow: 2, padding: '10px' }} size="large">
            Добавить сотрудника
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{ flexGrow: 1, border: 1, borderColor: 'divider' }}
            color="warning"
            onClick={handleResetClick}
          >
            Очистить
          </Button>
        </Box>
        {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </LocalizationProvider>
  );
}
