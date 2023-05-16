import { createAsyncThunk } from "@reduxjs/toolkit";


export const getEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
  try {
    const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      console.log(data)
      return data 
  } catch (error) {
    return Promise.reject(new Error("400"));
  }
});