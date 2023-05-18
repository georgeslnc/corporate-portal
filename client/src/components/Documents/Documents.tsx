import React, { ChangeEvent, useEffect, useState } from 'react';
import { setFiles } from '../../redux/Thunk/files/setFiles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { getFiles } from '../../redux/Thunk/files/getFiles';
import { File } from '../../redux/type';
import DocumentsAudit from './DocumentsAudit';
import DocumentsHR from './DocumentsHR';

export default function Documents() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  const files = useAppSelector((state: RootState) => state.userFilesSlicer.files);

  const filesHr = files.filter((file) => file.documentType === 'Документы по работе с персоналом');

  const filesAudit = files.filter((file) => file.documentType === 'Документу бухгалтерии');

  const uploadFileHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(setFiles(formData));
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
          <select name="documentType">
            <option value="Документы по работе с персоналом">Документы по работе с персоналом</option>
            <option value="Документу бухгалтерии">Документу бухгалтерии</option>
          </select>
        </div>
        <button type="submit">Загрузить документ</button>
      </form>
      <DocumentsHR filesHr={filesHr} />
      <DocumentsAudit filesAudit={filesAudit} />
    </div>
  );
}
