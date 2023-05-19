import { createAsyncThunk } from '@reduxjs/toolkit';

export const delEmployees = createAsyncThunk('files/fetchDelEmployees', async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/deleteemployees/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return id;
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});
