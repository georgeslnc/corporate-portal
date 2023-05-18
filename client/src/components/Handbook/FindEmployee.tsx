import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppSelector } from '../../redux/type';

export default function FindEmployee() {

  const navigate = useNavigate()
  const { id } = useParams();
  
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  const selectedEmployee = employees.find((employee: Employee) => employee.id === Number(id));
  const selectedGroup = groups.find((group:Group) => group.id === selectedEmployee?.groupId)
  const groupHead = employees.find((employee: Employee)=>employee.id === selectedGroup?.groupHeadId )
  const selectedProfession = professions.find((profession:Profession)=> profession.id === selectedEmployee?.professionId)
  const selectedDepartament = departaments.find((department:Departament)=> department.id === selectedGroup?.departamentId)
  
  return (
        <div>
          <img src ={`${selectedEmployee?.photoUrl}`} alt='photo' />
          <p>{selectedEmployee?.firstName}</p>
          <p>{selectedEmployee?.middleName}</p>
          <p>{selectedEmployee?.lastName}</p>
          <p>Должность: {selectedProfession?.position}</p>
          <p>{selectedGroup?.title}</p>
          <p>{selectedDepartament?.title}</p>
          <p>Расположение: {selectedDepartament?.location}</p>
          <p>{selectedEmployee?.phone}</p>
          <p>{selectedEmployee?.email}</p>
          <p>
              Руководитель{' '}
              <Link to={`/employee/${groupHead?.id}`}>
                {groupHead?.firstName} {groupHead?.lastName}
              </Link>
            </p>
          <button onClick={()=> navigate(-1)}>Назад</button>
        </div>
  );
}

