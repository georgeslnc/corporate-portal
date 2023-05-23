import React from 'react';
import { File, useAppDispatch } from '../../redux/type';
import { downloadedFile } from '../../redux/Thunk/files/downloadedFile';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { delFileFromBack } from '../../redux/Thunk/files/deleteFile';
import DeleteIcon from '@mui/icons-material/Delete';

interface DocumentsAuditProps {
  filesAudit: File[];
}

export default function DocumentsAudit({ filesAudit }: DocumentsAuditProps) {
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
        Документы бухгалтерии
      </Typography>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '18px', fontWeight: '600' }}>Название документа</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesAudit.map((file: File) => (
              <TableRow key={file.id}>
                <TableCell style={{ whiteSpace: 'nowrap', fontSize: '18px' }}>{file.adminTitle}</TableCell>
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
