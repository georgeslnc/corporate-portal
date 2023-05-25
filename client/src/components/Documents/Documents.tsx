import React, { ChangeEvent, useEffect, useState } from 'react';
import { setFiles } from '../../redux/Thunk/files/setFiles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import { getFiles } from '../../redux/Thunk/files/getFiles';
import { File } from '../../redux/type';
import DocumentsAudit from './DocumentsAudit';
import DocumentsHR from './DocumentsHR';
import { Button, FormControl, MenuItem, Select, Typography, Input, Grid, List, Stack, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import style from '../Room/room.module.scss';

export default function Documents() {
  const dispatch = useAppDispatch();

  const [showLoad, setShowLoad] = useState(false);

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
    setShowLoad((prev) => !prev);
    setTimeout(() => {
      setShowLoad((prev) => !prev);
    }, 1000);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(setFiles(formData));
  };
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;

  return (
    <List
      sx={{
        width: '100%',
        height: '690px',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: '0px',
        '& ul': { padding: 0 },
        borderColor: 'divider',
        borderRadius: '5px',
      }}
      className={style.delScroll}
    >
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
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      padding: '10px 12px',
                      width: '322px',
                    }}
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
                <Button
                  type="submit"
                  color="inherit"
                  variant="contained"
                  size="small"
                  endIcon={<SendIcon />}
                  sx={{ marginBottom: '15px' }}
                >
                  Загрузить
                </Button>
                {showLoad ? (
                  <Stack sx={{ width: '100%', marginTop: '16px', marginBottom: '16px' }} spacing={2}>
                    <Alert severity="success">Документ загружен!</Alert>
                  </Stack>
                ) : null}
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
    </List>
  );
}
