import { styled } from '@mui/material/styles';
import { Typography, Paper, Button } from '@mui/material';

export const StyledCarousel = styled('div')({
  marginBottom: 20,
  width: '100%',
});

export const StyledPaper = styled(Paper)({
  padding: 20,
  margin: '0 auto',
  maxWidth: 600,
  border: '2px solid #ccc',
  borderRadius: 16,
  backgroundColor: '#f9f9f9',
  height: '210px',
});

export const NewsTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1rem',
});

export const SliderContainer = styled('div')({
  textAlign: 'center',
});

export const SliderButton = styled(Button)({
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
});

export const NewsContainer = styled('div')({
  background: '#f5f5f5',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  borderRadius: 16,
  minHeight: '526px',
});

export const PublishedAtText = styled(Typography)({
  position: 'absolute',
  bottom: 15,
});
