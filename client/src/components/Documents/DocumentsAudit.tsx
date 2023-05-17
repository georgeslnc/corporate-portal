import React from 'react';
import { File } from '../../redux/type';

interface DocumentsAuditProps {
  filesAudit: File[];
}

export default function DocumentsAudit({ filesAudit }: DocumentsAuditProps) {
  return (
    <div>
      <h1>Документы бухгалтерии</h1>
      <ul>
        {filesAudit.map((file: File) =>(
            <li key={file.id}>{file.title}</li>
          ))}
      </ul>   
    </div>
  );
}
