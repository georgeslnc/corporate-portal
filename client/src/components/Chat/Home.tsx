// import React, { useState } from 'react';
// import { Typography, Button, Modal, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
// import './styles.css';

// // Пример данных новостей
// const newsData: { id: number; title: string; content: string; image: string }[] = [
//   {
//     id: 1,
//     title: 'Главная новость',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image1.jpg',
//   },
//   {
//     id: 2,
//     title: 'Новость 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image2.jpg',
//   },
//   {
//     id: 3,
//     title: 'Новость 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image3.jpg',
//   },
//   {
//     id: 4,
//     title: 'Новость 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image4.jpg',
//   },
//   {
//     id: 5,
//     title: 'Новость 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image5.jpg',
//   },
//   {
//     id: 6,
//     title: 'Новость 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image6.jpg',
//   },
//   {
//     id: 7,
//     title: 'Новость 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu in lectus elementum convallis nec ac odio. Phasellus at efficitur turpis.',
//     image: 'image7.jpg',
//   },
// ];

// const News = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedNews, setSelectedNews] = useState<{ id: number; title: string; content: string; image: string } | null>(null);
//   const [visibleNews, setVisibleNews] = useState(newsData.slice(0, 4));
//   const [remainingNews, setRemainingNews] = useState(newsData.slice(4));
//   const [showMore, setShowMore] = useState(true);

//   const handleOpenModal = (news: { id: number; title: string; content: string; image: string }) => {
//     setSelectedNews(news);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleShowMore = () => {
//     const nextNews = remainingNews.slice(0, 3);
//     setVisibleNews((prevNews) => [...prevNews, ...nextNews]);
//     setRemainingNews((prevNews) => prevNews.slice(3));

//     if (remainingNews.length <= 3) {
//       setShowMore(false);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4">Главная новость</Typography>
//       <Card>
//         <CardMedia component="img" image={visibleNews[0].image} alt={visibleNews[0].title} height="200" />
//         <CardContent>
//           <Typography variant="h6">{visibleNews[0].title}</Typography>
//         </CardContent>
//         <CardActions>
//           <Button onClick={() => handleOpenModal(visibleNews[0])}>Подробнее</Button>
//         </CardActions>
//       </Card>

//       <Typography variant="h4">Дополнительные новости</Typography>
//       <Grid container spacing={2}>
//         {visibleNews.slice(1).map((item) => (
//           <Grid item xs={12} sm={6} md={4} key={item.id}>
//             <Card>
//               <CardMedia component="img" height="140" image={item.image} alt={item.title} />
//               <CardContent>
//                 <Typography variant="h6">{item.title}</Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" onClick={() => handleOpenModal(item)}>
//                   Подробнее
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {remainingNews.length > 0 && (
//         <Button onClick={handleShowMore} variant="outlined" color="primary">
//           Загрузить еще
//         </Button>
//       )}

//       <Modal open={openModal} onClose={handleCloseModal} className="modal">
//         <div className="modal-content">
//           <Typography variant="h6">{selectedNews?.title}</Typography>
//           <Typography variant="body1">{selectedNews?.content}</Typography>
//           <Button className="modal-close" onClick={handleCloseModal}>
//             Закрыть
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default News;
