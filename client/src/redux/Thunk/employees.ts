import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  try {
    const response = await fetch('http://localhost:3000/employees');
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});

export const getOffer = createAsyncThunk('getOffer/fetchOffer', async () => {
  try {
    const response = await fetch('http://localhost:3000/employees/offer');
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});
