import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Employee, Group, RootState, useAppSelector } from '../../redux/type';

export default function OneGroup() {

  const { id } = useParams()
  const navigate = useNavigate()
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
   const selectedGroup = employees.filter((employee: Employee) => employee.groupId === Number(id) )
  
  return (
    <ul>
    {selectedGroup.map((employee: Employee) => (
      <li key={employee.id}>
        <Link to={`/employee/${employee.id}`}>
          <p>{employee.firstName}</p>
          <p>{employee.lastName}</p>
        </Link>
      </li>
    ))}
    <button onClick={() => navigate(-1)}>Назад</button>
  </ul>
  )
}
