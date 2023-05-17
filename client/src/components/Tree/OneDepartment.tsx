import React, { useState } from 'react'
import { Departament, RootState, useAppSelector } from '../../redux/type'
import AllGroup from './AllGroup';

export default function OneDepartment({departament}:{departament: Departament}) {

  const [showGroup, setShowGroup] = useState(false)
  
  return (
    <div onClick={() => setShowGroup((prev)=> !prev)}>
      <h1>{departament.title}</h1>
      {showGroup && 
      <AllGroup departamentId={departament.id} />
      }
    </div>
  )
}
