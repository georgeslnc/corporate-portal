import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppSelector, useAppDispatch } from '../../redux/type';
import { Button, List, ListSubheader, Typography } from '@mui/material';
import style from './room.module.scss';
import Bid from '../Application/Bid';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { getOffer } from '../../redux/Thunk/employees';
import { useSelector } from 'react-redux';

const FIELDS = {
  NAME: 'username',
};

export default function Room() {
  const [youApp, setYouApp] = useState(true);

  const dispatch = useAppDispatch();

  const offer = useAppSelector((state: RootState) => state.employeesSlice.offer);
  const group = useAppSelector((state: RootState) => state.employeesSlice.group);

  const localData = localStorage.userData;
  const currUserId = JSON.parse(localData)?.userId;

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));

  const showMyApp = () => {
    setYouApp(false);
  };
  const showYouApp = () => {
    setYouApp(true);
  };

  return (
    <>
      <div className={style.containerUser}>
        <img src={`${currUser?.photoUrl}`} alt="photo" />
        <div>
          <Typography sx={{ fontSize: '17px' }}>
            {currUser?.lastName} {currUser?.firstName} {currUser?.middleName}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon fontSize="small" color="inherit" /> {currUser?.phone}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon fontSize="small" color="inherit" /> {currUser?.email}
          </Typography>
        </div>
      </div>
      <Button
        sx={{ backgroundColor: 'rgb(194, 200, 207)', color: 'black', marginTop: '20px', marginRight: '20px' }}
        onClick={showYouApp}
      >
        Заявки в отдел
      </Button>

      <Button
        sx={{ backgroundColor: 'rgb(194, 200, 207)', color: 'black', marginTop: '20px', marginRight: '20px' }}
        onClick={showMyApp}
      >
        Мои заявки
      </Button>
      {youApp ? (
        <Bid />
      ) : (
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
          <ul>
            <ListSubheader sx={{ color: 'black', backgroundColor: ' rgb(221, 223, 226)', margin: '0px', width: '100%' }}>
              <Typography variant="h5" component="h2">
                Мои заявки
              </Typography>
            </ListSubheader>
            {offer.map((el: any) => {
              if (currUserId === el.employeesId && !el.status) {
                return (
                  <li key={`${el.id}myOffer`} className={style.containerElement}>
                    <Typography sx={{ marginRight: '20px' }}>{el.title}</Typography>
                    {group.map((elem) => {
                      if (elem.id === el.groupId) {
                        return <Typography key={Date.now()}>{`Отправлено в:${elem.title}`}</Typography>;
                      }
                    })}
                  </li>
                );
              }
            })}
          </ul>
        </List>
      )}
    </>
  );
}
