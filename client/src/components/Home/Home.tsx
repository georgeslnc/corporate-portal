import React, { useState, useEffect, useRef } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/type';
import { fetchNews } from '../../redux/Thunk/news';
import { NewsItem } from '../../redux/type';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Typography, Box, Alert } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.style.css';

const NewsSlider = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state: RootState) => state.newsSlice);

  // useEffect(() => {

  // }, [dispatch]);

  const [nav1, setNav1] = useState<typeof Slider | null>(null);
  const [nav2, setNav2] = useState<typeof Slider | null>(null);
  const slider1Ref = useRef<typeof Slider>(null);
  const slider2Ref = useRef<typeof Slider>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
  }, []);

  const goToPrevSlide = () => {
    if (nav1) {
      nav1.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (nav1) {
      nav1.slickNext();
    }
  };

  // if (news.loading) {
  //   return <div>Loading...</div>;
  // }

  if (news.error) {
    return (
      <div className="error-container">
        <Alert severity="error">Error: {news.error}</Alert>
        <div className="oval-container">
          <img src="./img/404.gif" alt="Error GIF" className="error-image" />
          <div className="overlay"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-slider">
      <div className="slider-container">
        <Slider asNavFor={nav2} ref={slider1Ref} className="slider-content" slidesToShow={1}>
          {news.news.map((item: NewsItem) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: '#f0f0f0',
                height: '250px',
                marginLeft: '-15px',
                minWidth: '100%',
                borderRadius: '10px',
                display: 'flex !important',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }} className="slider-item__title">
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '16px', width: '95%' }}>{item.content}</Typography>
            </Box>
          ))}
        </Slider>

        <div className="slider-navigation">
          <button onClick={goToPrevSlide} className="slider-navigation__button">
            <FaChevronLeft />
          </button>
          <button onClick={goToNextSlide} className="slider-navigation__button">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <Slider
        asNavFor={nav1}
        ref={slider2Ref}
        className="second-slider"
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {news.news.map((item: NewsItem, index: number) => (
          <div key={item.id} className={`second-slider-item ${activeSlide === index ? 'active' : ''}`}>
            <div className="second-slider-item__image-container">
              <img src={item.image} alt={item.title} className="second-slider-item__image" />
            </div>
            <Typography sx={{ fontSize: '15px', paddingTop: '10px' }}>{item.title}</Typography>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
