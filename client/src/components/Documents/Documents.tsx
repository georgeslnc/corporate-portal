import React, { ChangeEvent, useState } from 'react';
import { setFiles } from '../../redux/slicers/file.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/type';

export default function Documents() {

  const dispatch = useDispatch()
  const files = useSelector((state: RootState) => state.userFilesSlicer.files)
  console.log(files);
  
  const uploadFileHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('http://localhost:3000/documents/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const fileInfo = await response.json();
    dispatch(setFiles(fileInfo))
  };

  return (
    <div>
      Documents
      <form onSubmit={uploadFileHandler}>
        <div>
          <label htmlFor="file">Выберите файл</label>
          <input type="file" name="file" />
        </div>
        <div>
          <label htmlFor="category">Выберите раздел</label>
          <select name="documentType" >
            <option value="Документы по работе с персоналом">Документы по работе с персоналом</option>
            <option value="Документу бухгалтерии">Документу бухгалтерии</option>
          </select>
        </div>
        <button type="submit">Загрузить документ</button>
      </form>
    </div>
  );
}

