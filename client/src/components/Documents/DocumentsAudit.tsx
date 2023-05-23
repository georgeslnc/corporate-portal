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
      <Typography
        variant="h5"
        component="h5"
        style={{ marginBottom: '0px', padding: '15px 15px', backgroundColor: ' rgb(201, 203, 206)', marginTop: '17px' }}
      >
        Документы бухгалтерии
      </Typography>
      <TableContainer component={Paper} style={{ width: '100%', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '18px', fontWeight: '600', backgroundColor: ' rgb(221, 223, 226)' }}>
                Название документа
              </TableCell>
              <TableCell style={{ backgroundColor: ' rgb(221, 223, 226)' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesAudit.map((file: File) => (
              <TableRow key={file.id}>
                <TableCell style={{ whiteSpace: 'nowrap', fontSize: '18px', backgroundColor: 'rgb(236, 239, 243)' }}>
                  {file.adminTitle}
                </TableCell>
                <TableCell align="right" style={{ backgroundColor: 'rgb(236, 239, 243)' }}>
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
