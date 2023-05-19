import React, { useEffect, useState } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/type';
import { fetchNews } from '../../redux/Thunk/news';
import { NewsItem } from '../../redux/type';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@mui/material';
import { StyledCarousel, StyledPaper, NewsTitle, SliderContainer, SliderButton, NewsContainer, PublishedAtText } from './styles';

export default function News() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state: RootState) => state.newsSlice);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? news.news.length - 1 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === news.news.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <NewsContainer>
      <NewsTitle variant="h1">НОВОСТИ</NewsTitle>
      {news.loading ? (
        <p>Загрузка новостей...</p>
      ) : news.error ? (
        <p>Ошибка загрузки новостей: {news.error}</p>
      ) : (
        <>
          <StyledCarousel>
            <Carousel
              autoPlay={false}
              animation="slide"
              index={currentSlide}
              onChange={(newIndex: number | undefined) => setCurrentSlide(newIndex ?? 0)}
              indicators={false}
            >
              {news.news.map((item: NewsItem) => (
                <StyledPaper key={item.id} elevation={3}>
                  <Typography variant="h5" style={{ marginBottom: '1rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1">{item.content}</Typography>
                  <PublishedAtText variant="caption">Опубликовано: {new Date(item.publishedAt).toLocaleString()}</PublishedAtText>
                </StyledPaper>
              ))}
            </Carousel>
          </StyledCarousel>
          {news.news.length > 1 && (
            <SliderContainer>
              <SliderButton onClick={handlePrevClick} disabled={false}>
                назад
              </SliderButton>
              <SliderButton onClick={handleNextClick} disabled={false}>
                вперед
              </SliderButton>
            </SliderContainer>
          )}
        </>
      )}
    </NewsContainer>
  );
}
