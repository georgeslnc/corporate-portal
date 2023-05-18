import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { changeStatusOffer } from '../../redux/Thunk/changeStatusOffer';
import useEffect from 'react';

const userData: string | null = localStorage.getItem('userData');
const parsedUserData: { groupId: number } = userData ? JSON.parse(userData) : {};
const groupId: number = parsedUserData.groupId || 0;

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
      <React.Fragment>
        <span>{`Автор заявки: ${employee.firstName} ${employee.lastName}`}</span>
        <span>{`Название отдела: ${authorGroup.title}`}</span>
      </React.Fragment>
    );
  };

  return (
    <>
      <ul>
        {filteredOffers.map((el) => (
          <li key={`${el.id}offers`}>
            <h4>{el.title}</h4>
            <button onClick={() => dispatch(changeStatusOffer(el.id))}>Сделано</button>
            {renderAuthorInfo(el.employeesId)}
          </li>
        ))}
      </ul>
      <ul>
        {completedOffers.map((el) => (
          <li key={`${el.id}status`}>
            <h5>{el.title}</h5>
            {renderAuthorInfo(el.employeesId)}
          </li>
        ))}
      </ul>
    </>
  );
}
