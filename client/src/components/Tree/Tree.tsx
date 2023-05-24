import React, { useEffect } from 'react';
import { Departament, RootState, useAppSelector } from '../../redux/type';
import OneDepartment from './OneDepartment';
import { List } from '@mui/material';
import style from '../Room/room.module.scss';

export default function Tree() {
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  useEffect(() => {
    document.title = `Структура компании`;
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  return (
    <List
      sx={{
        width: '100%',
        height: '690px',
        bgcolor: 'rgba(0, 0, 0, 0)',
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: '0px',
        '& ul': { padding: 0 },
        borderColor: 'divider',
        borderRadius: '5px',
      }}
      className={style.delScroll}
    >
      {departaments.map((departament: Departament) => (
        <OneDepartment key={departament.id} departament={departament} />
      ))}
    </List>
  );
}
