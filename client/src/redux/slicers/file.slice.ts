import { createSlice } from '@reduxjs/toolkit';
import { InitialFilesState } from '../type';
import { getFiles } from '../Thunk/files/getFiles';
import { setFiles } from '../Thunk/files/setFiles';

const initialState: InitialFilesState = {
  files: [],
  loading: false,
};

const userFilesSlicer = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = [...action.payload];
        state.loading = false;
      })
      .addCase(setFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(setFiles.fulfilled, (state, action) => {
        state.files = [...state.files, action.payload];
      });
  },
});

export default userFilesSlicer.reducer;
