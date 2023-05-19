import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/type";
import { useForm, SubmitHandler } from "react-hook-form";
import { postOffer } from "../../redux/Thunk/offer";
import Bid from "./Bid";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import style from "./application.module.scss";

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
    console.log("fsd");
    reset();
    dispatch(postOffer(offerData));
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Выберите департамент и отдел для заполения заявки на отдел
      </Typography>
      <Box sx={{ width: "400px", marginTop: "30px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Выбор департамента
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={titleDep}
            label="Выбор департамента"
            onChange={eventDepartment}
          >
            {department.map((element) => (
              <MenuItem key={element.id} value={element.title}>
                {element.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "30px" }}>
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
      {titleGroup && (
        <>
          <Typography variant="h5" component="h2" sx={{ marginTop: "50px" }}>
            Коротко укажите вашу проблему и желаемое время на устрание(минимум 1
            час)
          </Typography>
          <Typography variant="h6" component="h2" sx={{ fontSize: "14px" }}>
            Если ваша заявка требует неотложна зайдите в справочник и свяжитесь
            на прямую
          </Typography>
          <Box
            sx={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              borderColor: "divider",
              gap: 1,
              marginTop: "50px",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" component="h2" sx={{ fontSize: "14px" }}>
              Текст заявки
            </Typography>
            <TextField type="text" {...register("value")} />
            <Typography variant="h4" component="h2" sx={{ fontSize: "14px" }}>
              Желаемое время на выполнение(считается в часах)
            </Typography>
            <TextField type="number" {...register("time")} />
            <Button type="submit" sx={{ background: "rgb(203, 210, 218)" }}>
              Подать заявку
            </Button>
          </Box>
        </>
      )}
      <Bid />
    </>
  );
}
