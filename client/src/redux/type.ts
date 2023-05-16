import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  store  from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Employee = {
  id: number,
  firstName: string;
  middleName: string;
  lastName: string;
  groupId: number;
  professionId: number;
  email: string;
  phone: string;
  birthday: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InititalStateEmployee {
  employees: Employee[]
  group: unknown[],
  department: unknown[],
}


