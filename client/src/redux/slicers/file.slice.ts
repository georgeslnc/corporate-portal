import { createSlice } from "@reduxjs/toolkit";
import { InitialFilesState } from "../type";

const initialState: InitialFilesState = {
  files: [],
  loading: false
}

const userFilesSlicer = createSlice({
  name: 'file',
  initialState,
  reducers:{
    setFiles(state, action) {
      state.files = [...state.files, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFiles.pending, (state) => {
      state.loading = true;
    })
    .addCase(getFiles.fulfilled, (state, action) => {
      state.files = action.payload;
      state.loading = false;
    })
  }
})

export const { setFiles } = userFilesSlicer.actions

export default userFilesSlicer.reducer