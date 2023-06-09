import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import employeesSlice from '../redux/slicers/employees.slice';
import newsSlice from '../redux/slicers/news.slice';
import userFilesSlicer from '../redux/slicers/file.slice';
import todoSlice from './slicers/todo.slice';
import authSlicer from './slicers/auth.slice';

const store = configureStore({
  reducer: {
    employeesSlice,
    newsSlice,
    userFilesSlicer,
    todoSlice,
    authSlicer,
  },
});

export default store;
