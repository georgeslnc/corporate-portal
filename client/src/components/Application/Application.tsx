import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/type";
import { useForm, SubmitHandler } from "react-hook-form";
import { postOffer } from "../../redux/Thunk/offer";
import Bid from "./Bid";
import {
  Box,
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
    "0"
  );
  const [titleDep, setTitleDep] = useState("");
  const [titleGroup, settitleGroup] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const { register, handleSubmit, reset } = useForm<Inputs>();
 // const { control, handleSubmit } = useForm<IFormInput>();

  const eventDepartment = (e: SelectChangeEvent) => {
    const selectedOption = e.target.value;
    const depId = department.find((el) => el.title === selectedOption)?.id;
    setTitleDep(selectedOption || "");
    settitleGroup("");
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
     <Box sx={{ width: 320, color: "black" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Выбор департамента</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={titleDep}
          label = "Выбор департамента"
          onChange={eventDepartment}
        >
          {department.map((element) => (
            <MenuItem key={element.id} value={element.title}>
              {element.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "30px"}}>
        <InputLabel id="demo-simple-select-label">Выбор отдела</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={titleGroup}
          label="Выбор отдела"
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
     </Box>
     {
      titleGroup && 
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("value")} />
        <input type="number" {...register("time")} />
        <button>Подать заявку</button>
      </form>
     }
      <Bid />
    </>
  );
}
