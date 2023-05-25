import React, { useState, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { changeStatusOffer } from '../../redux/Thunk/changeStatusOffer';
import { Box, Button, List, ListSubheader, Typography } from '@mui/material';
import style from './application.module.scss';
import { getOffer } from '../../redux/Thunk/employees';

const userData: string | null = localStorage.getItem('userData');
const parsedUserData: { groupId: number } = userData ? JSON.parse(userData) : {};
const groupId: number = parsedUserData.groupId || 0;
const localData = localStorage.userData;
const currUserId = localData ? JSON.parse(localData).userId : null;

export default function Bid() {
  const offer = useAppSelector((state: RootState) => state.employeesSlice.offer);
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const group = useAppSelector((state: RootState) => state.employeesSlice.group);
  const dispatch = useAppDispatch();

  const filteredOffers = offer.filter((el) => el.groupId === groupId && !el.status);

  const completedOffers = offer.filter((el) => el.groupId === groupId && el.status);

  const renderAuthorInfo = (employeeId: string) => {
    const employee = employees.find((element) => element.id === Number(employeeId));
    if (!employee) return null;

    const authorGroup = group.find((elem) => elem.id === employee.groupId);
    if (!authorGroup) return null;

    return (
      <div className={style.authorInfo}>
        <Typography
          sx={{ fontSize: '15px', marginRight: '20px' }}
        >{`Автор заявки: ${employee.firstName} ${employee.lastName}`}</Typography>
        <Typography sx={{ fontSize: '15px' }}>{`Заявка от: ${authorGroup.title}`}</Typography>
      </div>
    );
  };
  const Probel = '     ';
  return (
    <List
      sx={{
        width: '100%',
        height: '527px',
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
        {filteredOffers.map((el) => (
          <li key={`${el.id}offers`} className={style.containerElement}>
            <div className={style.containerValueButton}>
              <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>
                {el.title}
                <Typography>
                  <Typography component="span" sx={{ fontSize: '16px', fontWeight: '400', marginRight: '40px' }}>
                    {`Время заявки ${new Date(el.createdAt).toLocaleString().slice(0, -3)}`}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontSize: '16px', fontWeight: '400' }}
                  >{`Время обработки:${el.deadline} час`}</Typography>
                </Typography>
              </Typography>
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
        {completedOffers.map((el) => (
          <li key={`${el.id}status`} className={style.containerElement}>
            <Typography sx={{ display: 'flex', fontSize: '18px', fontWeight: '700' }}>
              {el.title}
              {employees.map((elem) => {
                if (elem.id === el.employeesCloseId) {
                  return (
                    <Typography
                      component={'span'}
                      key={Date.now()}
                      sx={{ marginLeft: '20px', fontSize: '15px', display: 'flex', alignItems: 'center' }}
                    >{` Выполнено: ${elem.firstName} ${elem.lastName}`}</Typography>
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
