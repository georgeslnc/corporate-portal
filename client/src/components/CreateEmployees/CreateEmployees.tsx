import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/system';

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

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
});

export default function EmployeeForm() {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // convert birthday to ISO string
    if (data.birthday) {
      data.birthday = data.birthday.toISOString();
    }

    // create FormData for image upload
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("firstName")} label="First Name" error={Boolean(errors.firstName)} helperText={errors.firstName?.message} />
        <TextField {...register("middleName")} label="Middle Name" error={Boolean(errors.middleName)} helperText={errors.middleName?.message} />
        <TextField {...register("lastName")} label="Last Name" error={Boolean(errors.lastName)} helperText={errors.lastName?.message} />
        
        <FormControl error={Boolean(errors.groupId)}>
          <InputLabel id="group-label">Group</InputLabel>
          <Select {...register("groupId")}>
            {/* Replace with your options */}
            <MenuItem value="group1">Group 1</MenuItem>
            <MenuItem value="group2">Group 2</MenuItem>
          </Select>
          <FormHelperText>{errors.groupId?.message}</FormHelperText>
        </FormControl>

        <FormControl error={Boolean(errors.professionId)}>
          <InputLabel id="profession-label">Profession</InputLabel>
          <Select {...register("professionId")}>
            {/* Replace with your options */}
            <MenuItem value="profession1">Profession 1</MenuItem>
            <MenuItem value="profession2">Profession 2</MenuItem>
          </Select>
          <FormHelperText>{errors.professionId?.message}</FormHelperText>
        </FormControl>

        <TextField {...register("email")} label="Email" type="email" error={Boolean(errors.email)} helperText={errors.email?.message} />
        <TextField {...register("phone")} label="Phone" type="tel" error={Boolean(errors.phone)} helperText={errors.phone?.message} />

        <DatePicker
          label="Birthday"
          value={null}
          onChange={(newValue) => {
            setValue('birthday', newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <input {...register("photo")} type="file" />

        <Button type="submit">Submit</Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Form>
    </LocalizationProvider>
  );
}
