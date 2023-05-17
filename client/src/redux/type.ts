import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Employee = {
  id: number;
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
};

export type Group = {
  id: number;
  title: string;
  departamentId: number;
  groupHeadId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Departament = {
  id: number;
  title: string;
  location: string;
  departamentHeadId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Profession = {
  id: number;
  position: string;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface InititalStateEmployee {
  employees: Employee[];
  group: Group[];
  department: Departament[];
  profession: Profession[];
  offer: Offer[];
}

export type Offer = {
  id: number;
  title: string;
  groupId: string;
  employeesId: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface InititalStateOffer {
  offer: Offer[];
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export interface NewsState {
  loading: boolean;
  news: NewsItem[];
  error: string;
}
