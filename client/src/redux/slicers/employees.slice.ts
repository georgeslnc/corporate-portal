import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InititalStateEmployee, Offer } from '../type';
import { getEmployees } from '../Thunk/employees';
import { postOffer } from '../Thunk/offer';
import { changeStatusOffer } from '../Thunk/changeStatusOffer';

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
    builder.addMatcher(
      (action) => action.type === changeStatusOffer.fulfilled.type,
      (state, action: PayloadAction<number>) => {
        state.offer = state.offer.map((el) => {
          if (el.id === action.payload) {
            return { ...el, status: true };
          }
          return el;
        });
      }
    );
  }
});

export default employeesSlice.reducer;
