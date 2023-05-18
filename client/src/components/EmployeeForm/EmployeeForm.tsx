import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, useAppSelector } from '../../redux/type';

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';

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

type PopupProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  handleClose: () => void;
};

// todo: проверить Popup/удалить код
// function Popup({ open, message, severity, handleClose }: PopupProps) {
//   return (
//     <Snackbar open={open} autoHideDuration={3 * 1000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// }

type Inputs = {
  firstName: string;
  middleName: string;
  lastName: string;
  groupTitle: string;
  profession: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  // photo: FileList;
};

const minDate = new Date(1930, 0, 1);
const maxDate = addYears(new Date(), -18);

export default function EmployeeForm() {
  const [selectedDate, handleDateChange] = useState<Date | null>(maxDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
        setOpen(true);
        reset();
        handleDateChange(maxDate);
        // navigate('/');
        setTimeout(() => {
          setAlertMessage('');
        }, 6 * 1000);
      } else {
        console.error(`Error: ${res.status}`);
        const errorData = await res.json();
        setErrorMessage(errorData.message);
        // reset();
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
        <FormControl error={Boolean(errors.groupTitle)} sx={{ flexGrow: 1 }}>
          <InputLabel id="group-label">Отдел</InputLabel>
          <Select {...register('groupTitle', { required: true })} label="Отдел">
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
          <Select {...register('profession', { required: true })} label="Должность">
            {professions.map((profession) => (
              <MenuItem value={profession.position} key={profession.id}>
                {profession.position}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.profession?.message}</FormHelperText>
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
        {/* <Popup open={open} message={alertMessage} severity="success" handleClose={handleClose} /> */}
        {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
      </Box>
    </LocalizationProvider>
  );
}
