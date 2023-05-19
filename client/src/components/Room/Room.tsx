import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppSelector } from '../../redux/type';


export default function Room() {

  const  { id } = useParams();
 
  const navigate = useNavigate()

  // get user from local storage
  const localData = localStorage.userData;
  const currUserId = JSON.parse(localData).userId

  const handSendToTheChat = () => {
    navigate('/chat');
  };

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));
  
  const userGroupId = currUser?.groupId;
  const userGroup = groups[userGroupId-1];
  
  const professionsId = currUser?.professionId
  const userProfession = professions[professionsId-1]
  
  const departamentsId = currUser?.groupId
  const currDepartamnt = departaments[departamentsId-1]

  const bossDepId = currUser?.groupId
  const currDepartamntBoss = departaments[departamentsId-1]
  const myBoss = currDepartamntBoss?.departamentHeadId
  
  const selectedEmployee = employees.find((employee: Employee) => employee.id === Number(id));
  const selectedGroup = groups.find((group:Group) => group.id === selectedEmployee?.groupId)
  const groupHead = employees.find((employee: Employee)=>employee.id === selectedGroup?.groupHeadId )
  const selectedProfession = professions.find((profession:Profession)=> profession.id === selectedEmployee?.professionId)
  const selectedDepartament = departaments.find((department:Departament)=> department.id === selectedGroup?.departamentId)
  
  console.log('groups------------', groups);
  console.log('currUser------------', currUser);
  console.log('departaments------------', departaments);
  console.log('professions------------', professions);
  


  
  return (
    <div>
        <img src ={`${currUser?.photoUrl}`} alt='photo' />
          {/* <p>Фамилия:{selectedEmployee?.lastName}</p> */}
          {/* <p>Фамилия local:{fullName3?.firstName}</p> */}
          <p>Имя: {currUser?.firstName}</p>
          <p>Отчество: {currUser?.middleName}</p>
          <p>Отчество: {currUser?.lastName}</p>
          <p>Телефон: {currUser?.phone}</p>
          <p>Почта: {currUser?.email}</p>
          <p>Должность: {userProfession?.position}</p>
          <p>Отдел: {userGroup?.title}</p>
          <p>{currDepartamnt?.title}</p>
          <p>Расположение: {currDepartamnt?.location}</p>
          <p>
              Руководитель{' '}
              <Link to={`/employee/${groupHead?.id}`}>
                {groupHead?.firstName} {groupHead?.lastName}
              </Link>
          </p>
          <p>
            <button onClick={() => handSendToTheChat()}>Чат</button>
          </p>
     </div>
  );
}
