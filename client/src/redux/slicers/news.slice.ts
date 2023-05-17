import { fetchNews } from './../Thunk/news';
import { createSlice } from '@reduxjs/toolkit';
import { NewsItem, NewsState } from '../type';

const initialState: NewsState = {
  loading: false,
  news: [] as NewsItem[],
  error: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = [...action.payload.news];
        state.error = '';
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.news = [];
        state.error = 'Произошла ошибка при выполнении запроса';
      });
  },
});

export default newsSlice.reducer;
