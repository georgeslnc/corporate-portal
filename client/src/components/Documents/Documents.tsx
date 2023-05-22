import React, { ChangeEvent, useEffect, useState } from 'react';
import { setFiles } from '../../redux/Thunk/files/setFiles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { getFiles } from '../../redux/Thunk/files/getFiles';
import { File } from '../../redux/type';
import DocumentsAudit from './DocumentsAudit';
import DocumentsHR from './DocumentsHR';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Input, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Documents() {
  const dispatch = useAppDispatch();
  console.log('hi');

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  useEffect(() => {
    document.title = 'Документы';
    return () => {
      document.title = 'SoftMaster';
    };
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
          <form onSubmit={uploadFileHandler}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6">Добавление документов</Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <Input id="file" type="file" name="file" disableUnderline />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Input
                    id="adminTitle"
                    type="text"
                    name="adminTitle"
                    placeholder="Название файла для отображения"
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Select labelId="category-label" name="documentType" defaultValue="Документы по работе с персоналом">
                    <MenuItem value="Документы по работе с персоналом">Документы по работе с персоналом</MenuItem>
                    <MenuItem value="Документу бухгалтерии">Документу бухгалтерии</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" size="small" endIcon={<SendIcon />}>
                  Загрузить документ
                </Button>
              </Grid>
            </Grid>
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
