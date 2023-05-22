import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      {' '}
      {/* Использование sx для стилей */}
      <Typography variant="h2" component="p">
        {time.toLocaleTimeString()}
      </Typography>
    </Box>
  );
};

export default Clock;
