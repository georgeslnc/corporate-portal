import React, { useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { changeStatusOffer } from '../../redux/Thunk/changeStatusOffer';
import useEffect from 'react';
import { Box, Button, List, ListSubheader, Typography } from '@mui/material';
import style from './application.module.scss';

const userData: string | null = localStorage.getItem('userData');
const parsedUserData: { groupId: number } = userData ? JSON.parse(userData) : {};
const groupId: number = parsedUserData.groupId || 0;
const localData = localStorage.userData;
const currUserId = JSON.parse(localData).userId;

export default function Bid() {
  const offer = useAppSelector((state: RootState) => state.employeesSlice.offer);
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const group = useAppSelector((state: RootState) => state.employeesSlice.group);
  const dispatch = useAppDispatch();

  const filteredOffers = offer.filter((el: any) => el.groupId === groupId && !el.status);

  const completedOffers = offer.filter((el: any) => el.groupId === groupId && el.status);

  const renderAuthorInfo = (employeeId: string) => {
    const employee = employees.find((element: any) => element.id === Number(employeeId));
    if (!employee) return null;

    const authorGroup = group.find((elem: any) => elem.id === employee.groupId);
    if (!authorGroup) return null;

    return (
      <div className={style.authorInfo}>
        <Typography
          sx={{ fontSize: '10px', marginRight: '20px' }}
        >{`Автор заявки: ${employee.firstName} ${employee.lastName}`}</Typography>
        <Typography sx={{ fontSize: '10px' }}>{`От: ${authorGroup.title}`}</Typography>
      </div>
    );
  };

  return (
    <List
      sx={{
        width: '80%',
        height: '583px',
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
      <ul className={style.test}>
        <ListSubheader sx={{ color: 'black', backgroundColor: ' rgb(221, 223, 226)', margin: '0px', width: '100%' }}>
          <Typography variant="h5" component="h2">
            Необходимо сделать
          </Typography>
        </ListSubheader>
        {filteredOffers.map((el: any) => (
          <li key={`${el.id}offers`} className={style.containerElement}>
            <div className={style.containerValueButton}>
              <Typography>{el.title}</Typography>
              <Button sx={{ background: 'rgb(203, 210, 218)' }} onClick={() => dispatch(changeStatusOffer([el.id, currUserId]))}>
                сделано
              </Button>
            </div>
            {renderAuthorInfo(el.employeesId)}
          </li>
        ))}
      </ul>
      <ul>
        <ListSubheader sx={{ color: 'black', backgroundColor: ' rgb(221, 223, 226)', margin: '0px', width: '100%' }}>
          <Typography variant="h5" component="h2">
            Выполненные задания
          </Typography>
        </ListSubheader>
        {completedOffers.map((el: any) => (
          <li key={`${el.id}status`} className={style.containerElement}>
            <Typography sx={{ display: 'flex' }}>
              {el.title}
              {employees.map((elem) => {
                if (elem.id === el.employeesCloseId) {
                  return (
                    <Typography
                      component={'span'}
                      key={Date.now()}
                      sx={{ marginLeft: '20px', fontSize: '10px' }}
                    >{`${elem.firstName} ${elem.lastName}`}</Typography>
                  );
                }
              })}
            </Typography>
            {renderAuthorInfo(el.employeesId)}
          </li>
        ))}
      </ul>
    </List>
  );
}
