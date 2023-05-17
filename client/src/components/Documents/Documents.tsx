import React, { ChangeEvent } from 'react';

export default function Documents() {
  const uploadFileHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('http://localhost:3000/documents/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const fileInfo = await response.json();
    console.log(fileInfo);
    

  };

  return (
    <div>
      Documents
      <form onSubmit={uploadFileHandler}>
        <input type="file" name="file" />
        <button type="submit">Загрузить документ</button>
      </form>
    </div>
  );
}

