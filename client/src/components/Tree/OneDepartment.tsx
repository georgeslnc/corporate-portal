import React from 'react'
import { Departament, RootState, useAppSelector } from '../../redux/type'

export default function OneDepartment({departament}:{departament: Departament}) {

  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  console.log(groups);
  

  return (
    <div>
      <h1>{departament.title}</h1>
    </div>
  )
}
