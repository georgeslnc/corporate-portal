import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const response = await fetch('http://localhost:3000/news');
    const data = await response.json();
    console.log('Thunk с бэка ===>>', data);
    return data;
  } catch (error) {
    throw new Error('Произошла ошибка при выполнении запроса');
  }
});
