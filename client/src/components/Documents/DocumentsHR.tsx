import React from 'react';
import { File } from '../../redux/type';

interface DocumentsHRProps {
  filesHr: File[];
}

export default function DocumentsHR({ filesHr }: DocumentsHRProps) {
  return (
    <div>
      <h1>Документы по работе с персоналом</h1>
      <ul>
        {filesHr.map((file: File) =>(
            <li key={file.id}>{file.title}</li>
          ))}
      </ul>   
    </div>
  );
}

