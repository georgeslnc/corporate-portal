import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITodo } from '../../redux/slicers/todo.slice';
import { useAppDispatch } from '../../redux/type';
import { addTodo, editTodo } from '../../redux/Thunk/Todos';
import { Box, Button, Input, TextField } from '@mui/material';
import { fontSize, width } from '@mui/system';

type Input = {
  todo: string;
  time: string;
};
type AddProps = {
  el?: ITodo;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};
const localData = localStorage.userData;
const currUserId = localData ? JSON.parse(localData).userId : null;

export default function AddTodo({ el, setEdit }: AddProps) {
  const { register, handleSubmit, reset } = useForm<Input>({
    defaultValues: { todo: el?.todo || '', time: el?.time },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (setEdit) {
      el && dispatch(editTodo({ id: el?.id, todo: data.todo, time: data.time }));
      setEdit(true);
    } else {
      dispatch(addTodo([data.todo, data.time, currUserId]));
    }
    reset();
  };

  return (
    <Box sx={{ marginBottom: '10px', width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input sx={{ height: '43px', marginRight: '10px', width: '85%' }} type="text" {...register('todo')} required />
        <Input sx={{ height: '43px', marginRight: '10px' }} type="time" {...register('time')} required />
        <Button sx={{ backgroundColor: 'rgb(217, 213, 210)', color: 'black', fontSize: '12px' }} type="submit">
          Добавить
        </Button>
      </form>
    </Box>
  );
}
