import React from 'react';
import { File, useAppDispatch } from '../../redux/type';
import { downloadedFile } from '../../redux/Thunk/files/downloadedFile';
import { Typography, List, ListItem, Button } from '@mui/material';
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
      <Typography variant="h5" component="h5">
        Документы бухгалтерии
      </Typography>
      <List>
        {filesAudit.map((file: File) => (
          <ListItem key={file.id}>
            {file.title}
            <FileDownloadIcon onClick={() => downloadHandler(file.id, file.title)}></FileDownloadIcon>
            {professionId === 5 ? <DeleteIcon onClick={() => deleteHandler(file.id)}></DeleteIcon> : null}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
