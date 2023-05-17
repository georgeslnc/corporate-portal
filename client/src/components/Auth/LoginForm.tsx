import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string,
  password: string,
};

const url = `http://localhost:3000/auth/register`;

export default function LoginForm() {

  // const [selectedValue, setSelectedValue] = useState<string | null>("");
  const { register, handleSubmit, formState: { errors }, reset, watch} = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState("");

 const watchedFields = watch();

  // useEffect(() => {
  //   // Сбрасываем сообщение об ошибке при каждом изменении
  //   setErrorMessage("");
  // }, [watchedFields]); // зависимость от watchedFields - значений полей формы


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        
      if (response.status === 200) {
        const responseData = await response.json()
        localStorage.setItem('userData', JSON.stringify(responseData));
         reset();
      } else {
        console.error(`Error: ${response.status}`);
         const errorData = await response.json()
         setErrorMessage(errorData.message);
      }
      
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" {...register("password", { required: "Password is required" })}  />
        {errors.password && <p>{errors.password.message}</p>}
        
        <button type="submit">Вход</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
}
