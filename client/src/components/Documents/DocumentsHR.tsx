import React from 'react';
import { File, useAppDispatch } from '../../redux/type';
import { downloadedFile } from '../../redux/Thunk/files/downloadedFile';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { delFileFromBack } from '../../redux/Thunk/files/deleteFile';
import DeleteIcon from '@mui/icons-material/Delete';

interface DocumentsHRProps {
  filesHr: File[];
}

export default function DocumentsHR({ filesHr }: DocumentsHRProps) {
  const dispatch = useAppDispatch();
  const downloadHandler = (id: number, title: string) => {
    dispatch(downloadedFile(id, title));
  };

  const deleteHandler = (id: number) => dispatch(delFileFromBack(id));

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;

  return (
    <div>
      <Typography variant="h5" component="h5" style={{ marginBottom: '15px' }}>
        Документы по работе с персоналом
      </Typography>
      <TableContainer component={Paper} style={{ width: '80%', marginBottom: '15px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название файла</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesHr.map((file: File) => (
              <TableRow key={file.id}>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{file.adminTitle}</TableCell>
                <TableCell align="right">
                  <FileDownloadIcon onClick={() => downloadHandler(file.id, file.title)} style={{ cursor: 'pointer' }} />
                  {professionId === 5 && <DeleteIcon onClick={() => deleteHandler(file.id)} style={{ cursor: 'pointer' }} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
