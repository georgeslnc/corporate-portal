import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFiles } from "./fetchFiles";

export const getFiles = createAsyncThunk("user/getFiles", async () => {
  const response = await fetchFiles();
  console.log(response);
  
  return response;
});