import React, { useState } from 'react';
import { Employee, RootState, useAppSelector } from '../../redux/type';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

export default function BasicTextFields() {
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const [searchQuery, setSearchQuery] = useState('');

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const fullName = `${employee.lastName} ${employee.firstName}`;
    const fullNameReversed = `${employee.firstName} ${employee.lastName}`;
    const query = searchQuery.toLowerCase();
    return (
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
        marginLeft: '50px'
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
        sx={{ width: '500px', marginTop: '100px', marginLeft: '25px' }}
      />
      {searchQuery && (
        filteredEmployees.map((employee: Employee) => (
          <ListItem key={employee.id} component={Link} to={`/employee/${employee.id}`}>
            <ListItemAvatar>
              <Avatar src={employee.photoUrl}/>
            </ListItemAvatar>
            <ListItemText primary={`${employee.firstName} ${employee.lastName}`} />
          </ListItem>
        ))
      )}
    </Box>
  );
}
