import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/type';
import AddTodo from './AddTodo';
import OneTodo from './OneTodo';
import { getTodos } from '../../redux/Thunk/Todos';
import { Box, List, ListSubheader, Typography } from '@mui/material';
import style from './OneTodo.module.css';

export default function Todo() {
  const array = useSelector((state: RootState) => state.todoSlice.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  return (
    <Box sx={{ width: '80%' }}>
      <AddTodo />
      <List
        sx={{
          width: '100%',
          height: '615px',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          overflowY: 'scroll',
          marginTop: '30px',
          padding: '0px',
          '& ul': { padding: 0 },
          border: 1,
          borderColor: 'divider',
          borderRadius: '5px',
          backgroundColor: 'rgb(236, 239, 243)',
        }}
        className={style.delScroll}
      >
        <ListSubheader sx={{ color: 'black', backgroundColor: ' rgb(221, 223, 226)', margin: '0px', width: '100%' }}>
          <Typography variant="h5" component="h2">
            Список дел
          </Typography>
        </ListSubheader>
        {array.length ? (
          array.map((el) => <OneTodo key={el.id} el={el} />)
        ) : (
          <>
            <h1>No todos</h1>
          </>
        )}
      </List>
    </Box>
  );
}
