import React, { useEffect, useState } from 'react';
import { Employee, RootState, useAppSelector } from '../../redux/type';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function BasicTextFields() {
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Справочник';
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleClick = (id: number) => navigate(`/employee/${id}`);

  const filteredEmployees = employees.filter((employee: Employee) => {
    const fullName = `${employee.lastName} ${employee.firstName}`;
    const fullNameReversed = `${employee.firstName} ${employee.lastName}`;
    const query = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      fullName.toLowerCase().includes(query) ||
      fullNameReversed.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query) ||
      employee.firstName.toLowerCase().includes(query)
    );
  });

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="searchQuery"
        label="Введите фамилию или имя сотрудника"
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        sx={{ width: '80%' }}
      />
      <Box
        sx={{
          maxHeight: '620px',
          width: '80%',
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
        }}
      >
        {searchQuery !== '' &&
          filteredEmployees.map((employee: Employee) => (
            <ListItem
              key={employee.id}
              component="div"
              onClick={() => handleClick(employee.id)}
              sx={{
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
              <ListItemText primary={`${employee.lastName} ${employee.firstName} ${employee.middleName} `} />
            </ListItem>
          ))}
        {searchQuery === '' &&
          employees.map((employee: Employee) => (
            <ListItem
              key={employee.id}
              component="div"
              onClick={() => handleClick(employee.id)}
              sx={{
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
              <ListItemText primary={`${employee.lastName} ${employee.firstName} ${employee.middleName} `} />
            </ListItem>
          ))}
      </Box>
    </Box>
  );
}
