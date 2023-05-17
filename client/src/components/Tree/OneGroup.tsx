import React from 'react'
import { Group, RootState, useAppSelector } from '../../redux/type';
import { Link } from 'react-router-dom';

type DepartamentId = {
  departamentId: number;
};

export default function OneGroup(departamentId: DepartamentId) {

  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);

  const selectedGroup = groups.filter((group:Group) => group.departamentId === departamentId.departamentId)

  return (
    <ul>
    {selectedGroup.map((group: Group) => (
      <li key={group.id}>
        <Link to={`/group/${group.id}`}>{group.title}</Link>
      </li>
    ))}
  </ul>
  )
}
