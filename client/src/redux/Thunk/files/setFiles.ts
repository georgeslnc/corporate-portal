import { createAsyncThunk } from "@reduxjs/toolkit";


export const setFiles = createAsyncThunk("files/fetchSetFiles", async (formData:any) => {


  try {
      const response = await fetch('http://localhost:3000/documents/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const fileInfo = await response.json();
    return fileInfo;
  } catch (error) {
    return Promise.reject(new Error("400"));
  }
});