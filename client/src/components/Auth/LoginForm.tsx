import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string,
  password: string,
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isDirty }, reset, watch} = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const navigate = useNavigate()
  const watchedFields = watch(); 

  useEffect(() => {
    if (isDirty) {
      setErrorMessage(null);
    }
  }, [watchedFields, isDirty]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        
      if (response.status === 200) {
        const responseData = await response.json()
        localStorage.setItem('userData', JSON.stringify(responseData));
         reset();
         navigate('/')
      } else {
        console.error(`Error: ${response.status}`);
         const errorData = await response.json()
         setErrorMessage(errorData.message);
         localStorage.removeItem('userData');
         reset();
      }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: "Введите email" })} placeholder="@email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" {...register("password", { required: "Введите пароль" })} placeholder="password" />
        {errors.password && <p>{errors.password.message}</p>}
        
        <button type="submit">Вход</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
}
