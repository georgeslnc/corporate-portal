import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Group, RootState, useAppSelector } from '../../redux/type';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

type DepartamentId = {
  departamentId: number;
};

export default function AllGroup(departamentId: DepartamentId) {
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);

  const navigate = useNavigate()

  const handleClick = (id:number) => (
    navigate(`/tree/${id}`)
  )

  const selectedGroup = groups.filter(
    (group: Group) => group.departamentId === departamentId.departamentId
  );


  return (
    <List component="nav" aria-label="mailbox folders">
      {selectedGroup.map((group: Group) => (
        <ListItem
          key={group.id}
          component="div"
          onClick={() => handleClick(group.id)}
          sx={{
            marginLeft: '15px',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {group.title}
        </ListItem>
      ))}
    </List>
  );
}


