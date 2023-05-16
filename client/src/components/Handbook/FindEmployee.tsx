import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '../../redux/type';

export default function FindEmployee() {

  const navigate = useNavigate()

  const { id } = useParams();

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);

  const selectedEmployee = employees.find((employee) => employee.id === Number(id));
  const selectedGroup = groups.find((group:any) => group.id === selectedEmployee?.groupId)
  const groupHead = employees.find((employee)=>employee.id === selectedGroup?.groupHeadId )

  
  

  return (
        <div>
          <img src ={`${selectedEmployee?.photoUrl}`} alt='photo' />
          <p>{selectedEmployee?.firstName}</p>
          <p>{selectedEmployee?.middleName}</p>
          <p>{selectedEmployee?.lastName}</p>
          <p>{selectedGroup?.title}</p>
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

