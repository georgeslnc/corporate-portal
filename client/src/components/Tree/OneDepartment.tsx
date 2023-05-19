import React, { useState } from 'react';
import { Departament } from '../../redux/type';
import AllGroup from './AllGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface OneDepartmentProps {
  departament: Departament;
}

export default function OneDepartment({ departament }: OneDepartmentProps) {
  const [showGroup, setShowGroup] = useState(false);

  const toggleGroup = () => {
    setShowGroup((prev) => !prev);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={toggleGroup}>
        <Typography variant="h6">{departament.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{showGroup && <AllGroup departamentId={departament.id} />}</AccordionDetails>
    </Accordion>
  );
}
