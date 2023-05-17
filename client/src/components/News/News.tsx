import React, { useEffect } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/type';
import { fetchNews } from '../../redux/Thunk/news';
import { NewsItem } from '../../redux/type';

export default function News() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state: RootState) => state.newsSlice);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div>
      <h1>Новости</h1>
      {news.loading ? (
        <p>Загрузка новостей...</p>
      ) : news.error ? (
        <p>Ошибка загрузки новостей: {news.error}</p>
      ) : (
        <ul>
          {news.news.map((item: NewsItem) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p>Опубликовано:{new Date(item.publishedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
