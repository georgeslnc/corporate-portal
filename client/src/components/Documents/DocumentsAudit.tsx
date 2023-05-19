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
    console.log(id, title);
    dispatch(downloadedFile(id, title));
  };
  const deleteHandler = (id: number) => dispatch(delFileFromBack(id));

  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const professionId = userData.professionId;

  return (
    <div>
      <Typography variant="h5" component="h5">
        Документы бухгалтерии
      </Typography>
      <List>
        {filesAudit.map((file: File) => (
          <ListItem key={file.id}>
            {file.title}
            <FileDownloadIcon onClick={() => downloadHandler(file.id, file.title)}>Скачать документ</FileDownloadIcon>
            {professionId === 5 ? <DeleteIcon onClick={() => deleteHandler(file.id)}>Скачать документ</DeleteIcon> : null}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
