import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InititalStateEmployee, Offer } from '../type';
import { getEmployees, getOffer } from '../Thunk/employees';
import { postOffer } from '../Thunk/offer';
import { changeStatusOffer } from '../Thunk/changeStatusOffer';
import { delEmployees } from '../Thunk/deleteEmployees';

const initialState: InititalStateEmployee = {
  employees: [],
  group: [],
  department: [],
  profession: [],
  offer: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      const { allEmployees, allGroup, allDepartment, allProfessions } = action.payload;
      state.employees = [...allEmployees];
      state.group = [...allGroup];
      state.department = [...allDepartment];
      state.profession = [...allProfessions];
    });
    builder.addCase(getOffer.fulfilled, (state, action) => {
      const { allOffer } = action.payload;
      state.offer = [...allOffer];
    });
    builder.addCase(postOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
      state.offer.push(action.payload);
    });
    builder.addMatcher(
      (action) => action.type === changeStatusOffer.fulfilled.type,
      (state, action: PayloadAction<number>) => {
        state.offer = state.offer.map((el) => {
          if (el.id === action.payload) {
            return { ...el, status: true };
          }
          return el;
        });
      },
    );
    builder.addMatcher(
      (action) => action.type === delEmployees.fulfilled.type,
      (state, action: PayloadAction<number>) => {
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      },
    );
  },
});

export default employeesSlice.reducer;
