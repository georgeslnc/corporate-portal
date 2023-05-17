import React from 'react'
import { Departament, RootState, useAppSelector } from '../../redux/type';
import OneDepartment from './OneDepartment';

export default function Tree() {

  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);
  console.log(departaments);
  

  return (
    <div>
      {departaments.map((departament:Departament)=> (
        <OneDepartment key={departament.id} departament={departament}/>
      ))}
    </div>
  )
}
