import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppSelector } from '../../redux/type';
import { Typography } from '@mui/material';
import style from './room.module.scss';
import Bid from '../Application/Bid';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Room() {
  const navigate = useNavigate();

  const localData = localStorage.userData;
  const currUserId = JSON.parse(localData).userId;

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));

  const selectedEmployee = employees.find((employee: Employee) => employee.id === Number(currUserId));
  const selectedGroup = groups.find((group: Group) => group.id === selectedEmployee?.groupId);
  const selectedProfession = professions.find((profession: Profession) => profession.id === selectedEmployee?.professionId);
  const selectedDepartament = departaments.find((department: Departament) => department.id === selectedGroup?.departamentId);

  return (
    <>
      <div className={style.containerUser}>
        <img src={`${currUser?.photoUrl}`} alt="photo" />
        <div>
          <Typography sx={{ fontSize: '17px' }}>
            {currUser?.lastName} {currUser?.firstName} {currUser?.middleName}
          </Typography>
          <Typography> {selectedGroup?.title} </Typography>
          <Typography>
            {selectedProfession?.position} ({selectedDepartament?.title} {selectedDepartament?.location})
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon fontSize="small" color="inherit" /> {currUser?.phone}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon fontSize="small" color="inherit" /> {currUser?.email}
          </Typography>
        </div>
      </div>
      <Bid />
    </>
  );
}
