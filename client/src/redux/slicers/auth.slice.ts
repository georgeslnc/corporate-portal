import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  employeeId: number;
}
const initialState: Auth = {
  employeeId: 0,
};

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.employeeId = action.payload;
    },
  },
});

export default authSlicer.reducer;
export const { setUser } = authSlicer.actions;
