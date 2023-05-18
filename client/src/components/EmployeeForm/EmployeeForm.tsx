import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, FormLabel } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // convert birthday to ISO string
    // if (data.birthday) {
    //   data.birthday = data.birthday.toISOString();
    // }

    // create FormData for image upload
const formData = new FormData();
// Object.keys(data).forEach((key) => {
//   if (key in data) {
//     formData.append(key, data[key as keyof Inputs]);
//   }
// })


    try {
      const response = await fetch(`http://localhost:3000/auth/register`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.status === 200) {
        const responseData = await response.json()
        localStorage.setItem('userData', JSON.stringify(responseData));
      } else {
        console.error(`Error: ${response.status}`);
        const errorData = await response.json()
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
     <FormLabel onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("firstName")} label="Имя" error={Boolean(errors.firstName)} helperText={errors.firstName?.message} />
        <TextField {...register("middleName")} label="Отчество" error={Boolean(errors.middleName)} helperText={errors.middleName?.message} />
        <TextField {...register("lastName")} label="Фамилия" error={Boolean(errors.lastName)} helperText={errors.lastName?.message} />
      </FormLabel>
  );
     
}
