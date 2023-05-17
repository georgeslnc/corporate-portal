import React, { useState } from "react";
import { RootState, useAppSelector } from "../../redux/type";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  string: string,
};

export default function Application() {
  const group = useAppSelector((state: RootState) => state.employeesSlice.group);
  const department = useAppSelector((state: RootState) => state.employeesSlice.department);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>("1");
  const [selectedValue, setSelectedValue] = useState<string | null>("");
  const { register, handleSubmit, reset} = useForm<Inputs>();

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
    
  }

  return (
    <>
      <select onChange={eventDepartment}>
        {department.map((element) => (
          <option
            key={element.id}
            value={element.title}
            data-id={element.id}
          >
            {element.title}
          </option>
        ))}
      </select>
      <select onChange={selectGroup}>
        {group.map((element) => (
          element.departamentId === Number(selectedDepartment) ? (
            <option
              key={element.id}
              value={element.title}
              data-id={element.id}
            >
              {element.title}
            </option>
          ): null
        ))}
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("value")} />
      </form>
    </>
  );
}
