import React from 'react';
import { File, useAppDispatch } from '../../redux/type';
import { downloadedFile } from '../../redux/Thunk/files/downloadedFile';

interface DocumentsHRProps {
  filesHr: File[];
}

export default function DocumentsHR({ filesHr }: DocumentsHRProps) {

  const dispatch = useAppDispatch()
  const downloadHandler = (id:number, title: string) => {
    console.log(id, title);
    dispatch(downloadedFile(id, title))
    
  }
  return (
    
    
    <div>
      <h1>Документы по работе с персоналом</h1>
      <ul>
        {filesHr.map((file: File) =>(
          <div key={file.id}>
            <li key={file.id}>{file.title}</li>
            <button onClick={()=> downloadHandler(file.id, file.title)}>Скачать документ</button>
          </div>
          ))}
      </ul>   
    </div>
  );
}

