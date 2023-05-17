import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InititalStateEmployee, Offer } from '../type';
import { getEmployees } from '../Thunk/employees';
import { postOffer } from '../Thunk/offer';

const initialState: InititalStateEmployee = {
  employees: [],
  group: [],
  department: [],
  profession: [],
  offer: [],
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      const {
        allEmployees,
        allGroup,
        allDepartment,
        allProfessions,
        allOffer,
      } = action.payload;
      state.employees = [...allEmployees];
      state.group = [...allGroup];
      state.department = [...allDepartment];
      state.profession = [...allProfessions];
      state.offer = [...allOffer];
    });
    builder.addCase(postOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
      state.offer.push(action.payload);
    });
  }
});

export default employeesSlice.reducer;
