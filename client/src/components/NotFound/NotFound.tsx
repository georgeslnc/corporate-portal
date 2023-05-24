import React from 'react';
import { Alert } from '@mui/material';

export default function NotFound() {
  return (
    <div className="error-container">
      <Alert severity="error">ERROR: Страница не найдена</Alert>
      <div className="oval-container">
        <img src="/img/404.gif" alt="Error GIF" className="error-image" />
        <div className="overlay"></div>
      </div>
    </div>
  );
}
