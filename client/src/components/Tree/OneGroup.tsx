import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Employee, Group, RootState, useAppSelector } from '../../redux/type';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function OneGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const selectedGroup = employees
    .filter((employee: Employee) => employee.groupId === Number(id))
    .filter((el: Employee) => el.professionId !== 3 && el.professionId !== 4);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const groupTitle = groups.find((group: Group) => group.id === Number(id));

  const selectedGroupAll = employees.filter((employee: Employee) => employee.groupId === Number(id));
  const groupHead = selectedGroupAll.find((employee: Employee) => employee.professionId === 3);

  const handleClick = (id: number | undefined) => navigate(`/employee/${id}`);

  useEffect(() => {
    document.title = `${groupTitle?.title}`;
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  return (
    <>
      <Typography variant="h6">{groupTitle?.title}</Typography>
      {selectedGroup.map((employee: Employee) => (
        <ListItem
          key={employee.id}
          component="div"
          onClick={() => handleClick(employee.id)}
          sx={{
            marginLeft: '15px',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <ListItemAvatar>
            <Avatar src={employee.photoUrl} />
          </ListItemAvatar>
          <ListItemText primary={`${employee.firstName} ${employee.lastName}`} />
        </ListItem>
      ))}
      <ListItem
        key={groupHead?.id}
        component="div"
        onClick={() => handleClick(groupHead?.id)}
        sx={{
          marginLeft: '15px',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ListItemAvatar>
          <Avatar src={groupHead?.photoUrl} />
        </ListItemAvatar>
        <ListItemText primary={`${groupHead?.firstName} ${groupHead?.lastName} - руководитель отдела`} />
      </ListItem>
      <Button style={{ marginLeft: '25px' }} color="inherit" onClick={() => navigate(-1)}>
        Назад
      </Button>
    </>
  );
}
