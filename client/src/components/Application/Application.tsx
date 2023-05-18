import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/type";
import { useForm, SubmitHandler } from "react-hook-form";
import { postOffer } from "../../redux/Thunk/offer";
import Bid from "./Bid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  const [titleDep, setTitleDep] = useState("");
  const [titleGroup, settitleGroup] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const eventDepartment = (e: SelectChangeEvent) => {
    const selectedOption = e.target.value;
    const depId = department.find((el) => el.title === selectedOption)?.id;
    setTitleDep(selectedOption || "");
    setSelectedDepartment(`${depId}` || null);
  };

  const selectGroup = (e: SelectChangeEvent) => {
    const selectedOption = e.target.value;
    const groupId = group.find((el) => el.title === selectedOption)?.id;
    settitleGroup(selectedOption || "");
    setSelectedValue(`${groupId}`);
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={titleDep}
          label="department"
          onChange={eventDepartment}
        >
          {department.map((element) => (
            <MenuItem key={element.id} value={element.title}>
              {element.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={titleGroup}
          label="department"
          onChange={selectGroup}
        >
          {group.map((element) =>
            element.departamentId === Number(selectedDepartment) ? (
              <MenuItem key={element.id} value={element.title}>
                {element.title}
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("value")} />
        <input type="number" {...register("time")} />
        <button>Подать заявку</button>
      </form>
      <Bid />
    </>
  );
}
