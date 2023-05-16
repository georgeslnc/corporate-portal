import { createSlice } from '@reduxjs/toolkit';
import { InititalStateEmployee } from '../type'
import { getEmployees } from '../Thunk/employees';

const initialState: InititalStateEmployee = {
  employees: []
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = [...action.payload]
    })}
})

export default employeesSlice.reducer