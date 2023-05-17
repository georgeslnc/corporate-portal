import React, { useReducer, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/type";
import { useForm, SubmitHandler } from "react-hook-form";
import { postOffer } from "../../redux/Thunk/offer";
import Bid from "./Bid";

type Inputs = {
  value: string;
  time: string;
};
export type OfferData = {
  title: string;
  groupId: string | null;
  deadline: string;
};

export default function Application() {
  const group = useAppSelector(
    (state: RootState) => state.employeesSlice.group
  );
  const department = useAppSelector(
    (state: RootState) => state.employeesSlice.department
  );
  const dispatch = useAppDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    "1"
  );
  const [selectedValue, setSelectedValue] = useState<string | null>("1");
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const eventDepartment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.getAttribute("data-id");
    setSelectedDepartment(selectedId);
  };

  const selectGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.getAttribute("data-id");
    setSelectedValue(selectedId);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { value, time } = data;
    const offerData: OfferData = {
      title: value,
      groupId: selectedValue,
      deadline: time,
    };
    dispatch(postOffer(offerData));
  };

  return (
    <>
      <select onChange={eventDepartment}>
        {department.map((element) => (
          <option key={element.id} value={element.title} data-id={element.id}>
            {element.title}
          </option>
        ))}
      </select>
      <select onChange={selectGroup}>
        {group.map((element) =>
          element.departamentId === Number(selectedDepartment) ? (
            <option key={element.id} value={element.title} data-id={element.id}>
              {element.title}
            </option>
          ) : null
        )}
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("value")} />
        <input type="number" {...register("time")} />
        <button>Подать заявку</button>
      </form>
      <Bid />
    </>
  );
}
