import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Employee, Group, RootState, useAppSelector } from '../../redux/type';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OneGroupChart from './OneGroupChart';

export default function OneGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChart, setShowChart] = useState(false);
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);

  const selectedGroup = employees
    .filter((employee: Employee) => employee.groupId === Number(id))
    .filter((el: Employee) => el.professionId !== 3 && el.professionId !== 4);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const groupTitle = groups.find((group: Group) => group.id === Number(id));

  const selectedGroupAll = employees.filter((employee: Employee) => employee.groupId === Number(id));

  let departmentHead;

  if (id) {
    if (Number(id) % 2 === 0) {
      departmentHead = employees.filter(
        (employee: Employee) => employee.groupId === Number(id) - 1 && employee.professionId === 4,
      );
    } else {
      departmentHead = selectedGroupAll.filter((employee) => employee.professionId === 4);
    }
  }

  const groupHead = selectedGroupAll.find((employee: Employee) => employee.professionId === 3);

  const handleClick = (id: number | undefined) => navigate(`/employee/${id}`);

  const handleChartClick = () => {
    setShowChart((toggle) => !toggle);
  };

  useEffect(() => {
    document.title = `${groupTitle?.title}`;
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  return (
    <>
      <Typography variant="h6">{groupTitle?.title}</Typography>
      <Button onClick={handleChartClick}>{!showChart ? 'Посмотреть граф' : 'Закрыть'}</Button>
      {showChart ? (
        <OneGroupChart selectedGroupAll={selectedGroupAll} departmentHead={departmentHead} />
      ) : (
        <>
          <Box
            sx={{
              maxHeight: '590px',
              width: '560px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              overflowX: 'hidden',
            }}
          >
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
                <ListItemText primary={`${employee.lastName} ${employee.firstName} ${employee.middleName}`} />
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
              <ListItemText
                primary={`${groupHead?.lastName} ${groupHead?.firstName} ${groupHead?.middleName} - руководитель отдела`}
              />
            </ListItem>
          </Box>
          <Button style={{ marginLeft: '25px' }} color="inherit" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </>
      )}
    </>
  );
}
