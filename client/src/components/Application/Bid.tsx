import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { changeStatusOffer } from '../../redux/Thunk/changeStatusOffer';

const userData: string | null = localStorage.getItem('userData');
const parsedUserData: { groupId: number } = userData ? JSON.parse(userData) : null;
const groupId: number = parsedUserData ? parsedUserData.groupId : 3;

export default function Bid() {
  const offer = useAppSelector((state: RootState) => state.employeesSlice.offer);
  const dispatch = useAppDispatch();
  console.log(offer);
  return (
    <>
      <ul>
        {offer?.map((el) => {
          if (el.groupId === groupId && !el.status) {
            return (
              <li key={el.id}>
                <h4>{el.title}</h4>
                <button onClick={() => dispatch(changeStatusOffer(el.id))}>надо сделать</button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <ul>
        {offer?.map((el) => {
          if (el.groupId === groupId && el.status === true) {
            return <li key={`${el.id}status`}>{el.title}</li>;
          }
          return null;
        })}
      </ul>
    </>
  );
}
