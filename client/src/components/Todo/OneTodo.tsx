import React, { useState } from 'react';
import style from './OneTodo.module.css';
import AddTodo from './AddTodo';
import { useAppDispatch } from '../../redux/type';
import { delTodo, statusTodo } from '../../redux/Thunk/Todos';
import { Box, List, Typography } from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';

function OneTodo({ el }: any) {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(true);
  const [check, setCheck] = useState(true);

  const deleteTodo = (id: number) => {
    dispatch(delTodo(id));
  };

  const changeStatus = (id: number) => {
    dispatch(statusTodo({ id }));
    setCheck(() => !check);
  };

  return (
    <>
      {edit ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid  #e4dddd',
            width: '100%',
            height: '40px',
            marginBottom: '10px',
          }}
        >
          <Typography sx={{ marginRight: '20px', width: '65%' }}>{el.todo}</Typography>
          <Typography sx={{ marginRight: '20px' }}>{el.time}</Typography>
          <Box
            sx={{ marginRight: '10px' }}
            component="div"
            className={`${style.boxCheckbox} ${!el.completed ? '' : style.color}`}
            onClick={() => changeStatus(el.id)}
          />
          <DeleteForeverSharpIcon sx={{ marginRight: '10px' }} onClick={() => deleteTodo(el.id)}></DeleteForeverSharpIcon>
          <CreateSharpIcon onClick={() => setEdit(() => !edit)}></CreateSharpIcon>
        </Box>
      ) : (
        <AddTodo el={el} setEdit={setEdit} />
      )}
    </>
  );
}

export default OneTodo;
