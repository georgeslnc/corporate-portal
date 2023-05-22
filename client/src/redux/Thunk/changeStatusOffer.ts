import { createAsyncThunk } from '@reduxjs/toolkit';

export const changeStatusOffer = createAsyncThunk('offer/fetchOffer', async (arr: any) => {
  const [id, user] = arr;
  try {
    const response = await fetch('http://localhost:3000/application/status', {
      method: 'Post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, user }),
    });
    if (response.ok) {
      return id;
    }
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});
