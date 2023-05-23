import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, Chat, Description, Home, Inbox, MenuBook, PeopleAlt } from '@mui/icons-material';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, ListItemButton, Badge, Box } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Employee, RootState, useAppSelector } from '../../redux/type';

const drawerWidth = 275;

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    borderRadius: 10,
    height: '690px',
    marginTop: '80px',
    marginLeft: '10px',
    // backgroundImage: `url('/img/фон.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    border: '2px solid rgb(203, 203, 203)',
    backgroundColor: '#f0f0f0',
  },
  '& .MuiTypography-root': {
    color: 'black',
  },
});

const StyledLogo = styled('img')({
  marginRight: '10px',
  height: '45px',
  borderRadius: '7px',
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, ${theme.palette.primary.main} 10%, #69b4ff 80%)',
  '& .MuiTypography-root': {
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '2px',
    color: theme.palette.common.white,
  },
  boxShadow: 'none',
  borderRadius: '10px',
  marginLeft: '8px',
  marginRight: '10px',
  maxWidth: '98.9%',
  marginTop: '7px',
}));

const userData: string | null = localStorage.getItem('userData');
const parsedUserData: { groupId: number } = userData ? JSON.parse(userData) : {};
const groupId: number = parsedUserData.groupId || 0;

const Navbar = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(location.pathname);
  const offer = useAppSelector((state: RootState) => state.employeesSlice.offer);
  const navigate = useNavigate();

  const handleLinkClick = (path: any) => {
    setSelectedLink(path);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem('userData');
    navigate('/auth/login');
  };

  const localData = localStorage.userData;
  const parsedLocalData = localData ? JSON.parse(localData) : null;
  const currUserId = parsedLocalData ? parsedLocalData.userId : null;
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;
  const showAddEmployeeLink = professionId === 5;
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));
  const userName = currUser ? `${currUser.firstName} ${currUser.lastName}` : '';

  const navLinks = [
    { path: '/', name: 'Главная', icon: <Home /> },
    { path: '/handbook', name: 'Справочник', icon: <MenuBook /> },
    { path: '/tree', name: 'Структура компании', icon: <PeopleAlt /> },
    { path: '/applications', name: 'Заявки', icon: <Inbox /> },
    { path: '/documents', name: 'Документы', icon: <Description /> },
    { path: '/todo', name: 'Замэтки', icon: <FormatListBulletedSharpIcon /> },
    showAddEmployeeLink && { path: '/admin/employee', name: 'Добавить сотрудника', icon: <AddCircleOutlineIcon /> },
  ].filter(Boolean);

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <StyledLogo src="/img/logo.png" />
            <Typography variant="h6">SOFTMASTER</Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          {currUser ? (
            <Box sx={{ gap: '20px', display: 'flex', alignItems: 'center', width: '360px' }}>
              <Badge
                badgeContent={
                  offer.filter((el) => {
                    return el.groupId === groupId && el.status === false;
                  }).length
                }
                color="error"
              >
                <CircleNotificationsIcon sx={{ cursor: 'pointer' }} fontSize="large" onClick={() => navigate('/room')} />
              </Badge>
              <Typography variant="subtitle1">{userName}</Typography>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar alt="avatar" src={currUser.photoUrl} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent">
        <Divider />
        <List>
          {navLinks.map(({ path, name, icon }) => (
            <ListItemButton
              component={Link}
              to={path}
              key={path}
              selected={selectedLink === path}
              onClick={() => handleLinkClick(path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(70,70,70,0.3)',
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default Navbar;
