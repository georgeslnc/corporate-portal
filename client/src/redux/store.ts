import { configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import employeesSlice  from '../redux/slicers/employees.slice'
import newsSlice from '../redux/slicers/news.slice';

 const store = configureStore({
  reducer: {
    employeesSlice ,
    newsSlice,
  },

});

export default store
