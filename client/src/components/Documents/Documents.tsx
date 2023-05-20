import React, { ChangeEvent, useEffect, useState } from 'react';
import { setFiles } from '../../redux/Thunk/files/setFiles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { getFiles } from '../../redux/Thunk/files/getFiles';
import { File } from '../../redux/type';
import DocumentsAudit from './DocumentsAudit';
import DocumentsHR from './DocumentsHR';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;

  return (
    <div>
      {professionId === 5 ? (
        <>
          <Typography variant="h6">Добавление документов</Typography>
          <form onSubmit={uploadFileHandler}>
            <div>
              <FormControl>
                <Input id="file" type="file" name="file" disableUnderline />
              </FormControl>
              <FormControl>
                <Input id="file" type="text" name="adminTitle" placeholder="Название файла для отображения" disableUnderline />
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Select labelId="category-label" name="documentType" defaultValue="Документы по работе с персоналом">
                  <MenuItem value="Документы по работе с персоналом">Документы по работе с персоналом</MenuItem>
                  <MenuItem value="Документу бухгалтерии">Документу бухгалтерии</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button type="submit" variant="contained" size="small" endIcon={<SendIcon />}>
              Загрузить документ
            </Button>
          </form>
          <DocumentsHR filesHr={filesHr} />
          <DocumentsAudit filesAudit={filesAudit} />
        </>
      ) : (
        <>
          <DocumentsHR filesHr={filesHr} />
          <DocumentsAudit filesAudit={filesAudit} />
        </>
      )}
    </div>
  );
}
