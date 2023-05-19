import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Alert, AlertTitle } from '@mui/material';
import { Troubleshoot } from '@mui/icons-material';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<Inputs>();

  const [errorMessage, setErrorMessage] = useState<object | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const navigate = useNavigate();
  const watchedFields = watch();

  useEffect(() => {
    if (isDirty && !isErrorVisible) {
      setErrorMessage(null);
    }
  }, [watchedFields, isDirty]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const res = await response.json();

        console.log('|______|  res:', res);
        if (res.userData) {
          localStorage.setItem('userData', JSON.stringify(res.userData));
        }
        setErrorMessage(res.message);
        setIsErrorVisible(true);
        reset();

        setTimeout(() => {
          navigate('/');
          setIsErrorVisible(false);
        }, 1200);
      } else {
        console.error(`Error: ${response.status}`);
        const errorData = await response.json();

        setErrorMessage(errorData.message);
        localStorage.removeItem('userData');
        setIsErrorVisible(true);
        reset();

        setTimeout(() => {
          setIsErrorVisible(false);
        }, 2000);
      }
    } catch (error) {
      console.error('===> error', error);
      setErrorMessage({ title: 'Ошибка сервера.', message: 'Попробуйте повторить попытку позже.' });
      setIsErrorVisible(true);

      setTimeout(() => {
        setIsErrorVisible(false);
      }, 3000);
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
        borderRadius: '10px',
        p: 2,
        width: '400px',
        height: '350px',
        gap: 2,
        padding: '20px 30px',
        marginTop: '100px',
        marginLeft: '50px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <TextField
        {...register('email', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Пожалуйста, введите правильный адрес электронной почты',
          },
        })}
        label="Почта"
        type="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        sx={{
          width: '400px',
          height: '70px',
          marginTop: '40px',
        }}
      />

      <TextField
        {...register('password', {
          required: 'Поле обязательно для заполнения',
          minLength: {
            value: 3,
            message: 'Пароль должен содержать не менее 3 символов',
          },
        })}
        label="Пароль"
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        sx={{
          width: '400px',
          height: '70px',
        }}
      />

      <Button type="submit" variant="outlined" sx={{ width: '400px', padding: '10px' }}>
        Войти
      </Button>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      {/* {errorMessage && <Alert severity="error">{errorMessage}</Alert>} */}
      {isErrorVisible && (
        <Alert severity={errorMessage?.title === 'Успешный вход!' ? 'success' : 'error'}>
          <AlertTitle>{errorMessage?.title}</AlertTitle>
          {errorMessage?.message}
        </Alert>
      )}
    </Box>
  );
}
