import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputs } from './types';
import { getEmployees } from '../../redux/Thunk/employees';

import { Box, TextField, Button, Alert, SelectChangeEvent, Popover } from '@mui/material';

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
import { useAppDispatch } from '../../redux/type';

const minDate = new Date(1930, 0, 1);
const maxDate = addYears(new Date(), -18);

export default function EmployeeForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(maxDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [fileAttached, setFileAttached] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  const fileInput = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<any>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event?.target?.files ? event.target.files[0] : undefined;

    if (!file) {
      // Обработка ошибки или возврат из функции, если файл не был выбран.
      return;
    }

    reader.onloadend = () => {
      setFileAttached(true);
      setPopoverOpen(true);
      if (reader.result && typeof reader.result === 'string') {
        setImagePreviewUrl(reader.result);
      } else {
        // Обработка ошибки или предоставление значения по умолчанию, если reader.result - не строка.
        setImagePreviewUrl('');
      }
    };

    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    data = { ...data, birthday: selectedDate ? dateFormatter(selectedDate) : '' };

    const formData = new FormData();

    const file = fileInput.current?.files?.[0];
    if (file) {
      formData.append('photo', file);
    }

    const formDataCompatibleData: Record<string, any> = data;
    Object.keys(formDataCompatibleData).forEach((key) => {
      formData.append(key, formDataCompatibleData[key]);
    });

    try {
      const res = await fetch(`http://localhost:3000/admin/employees`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const responseData = await res.json();

      if (responseData.status === 200) {
        setAlertMessage(responseData.message);
        setSelectedDate(maxDate);
        handleResetClick();

        dispatch(getEmployees());

        setTimeout(() => {
          setAlertMessage('');
        }, 5 * 1000);
      } else {
        setErrorMessage(responseData.message);
        console.error(`Error: ${responseData.status}`);

        setTimeout(() => {
          setErrorMessage('');
        }, 5 * 1000);
      }
    } catch (error) {
      console.error('===> error', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginRight: '50px', marginTop: '-50px' }}>
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

          <Box aria-describedby={'popover'} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
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
              ref={buttonRef}
              variant={fileAttached ? 'contained' : 'outlined'}
              component="label"
              sx={{ flexGrow: 1 }}
              style={fileAttached ? { backgroundColor: 'cornflowerblue', color: 'white' } : {}}
            >
              Фото
              <input ref={fileInput} type="file" name="photo" hidden onChange={handleFileUpload} />
            </Button>
            {fileAttached && (
              <Popover
                id="popover"
                className="popover"
                anchorEl={buttonRef.current}
                open={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                sx={{ marginLeft: '70px' }}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
              >
                <img src={imagePreviewUrl} alt="Preview" style={{ height: '200px', width: 'auto', margin: 0 }} />
              </Popover>
            )}
          </Box>
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
    </div>
  );
}
