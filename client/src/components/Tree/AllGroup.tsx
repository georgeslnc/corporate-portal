import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Group, RootState, useAppSelector } from '../../redux/type';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

type DepartamentId = {
  departamentId: number;
};

export default function AllGroup(departamentId: DepartamentId) {
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/tree/${id}`);
  };

  const selectedGroup = groups.filter((group: Group) => group.departamentId === departamentId.departamentId);

  return (
    <List component="nav" aria-label="mailbox folders">
      {selectedGroup.map((group: Group) => (
        <ListItem
          key={group.id}
          component="div"
          onClick={() => handleClick(group.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '15px',
            textDecoration: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <GroupsIcon sx={{ marginRight: '10px' }} />
          <ListItemText primary={group.title} />
        </ListItem>
      ))}
    </List>
  );
}
