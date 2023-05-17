import { createSlice } from '@reduxjs/toolkit';
import { InititalStateEmployee } from '../type'
import { getEmployees } from '../Thunk/employees';

const initialState: InititalStateEmployee = {
  employees: [],
  group: [],
  department: [],
  profession: []
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = [...action.payload.allEmployees];
      state.group = [...action.payload.allGroup];
      state.department = [...action.payload.allDepartment];
      state.profession = [...action.payload.allProfessions];
    })}
})

export default employeesSlice.reducer