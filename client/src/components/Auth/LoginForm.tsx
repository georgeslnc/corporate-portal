import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, ErrorMessage } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField } from '@mui/material';

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
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const navigate = useNavigate();
  const watchedFields = watch();

  useEffect(() => {
    if (isDirty) {
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
        const responseData = await response.json();
        localStorage.setItem('userData', JSON.stringify(responseData));
        reset();
        navigate('/');
      } else {
        console.error(`Error: ${response.status}`);
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        localStorage.removeItem('userData');
        reset();
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
        gap: 1.5,
        marginTop: '100px',
        marginLeft: '50px',
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
      />

      <Button type="submit" variant="outlined" sx={{ width: '200px' }}>
        Войти
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  );
}
