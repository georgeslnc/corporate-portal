import { configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import employeesSlice  from '../redux/slicers/employees.slice'

 const store = configureStore({
  reducer: {
    employeesSlice ,
  },

});

export default store
