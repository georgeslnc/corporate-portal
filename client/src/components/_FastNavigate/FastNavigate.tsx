import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  AccountCircle,
  Chat,
  Description,
  Home,
  Inbox,
  MenuBook,
  PeopleAlt,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, ListItemButton } from '@mui/material';

const drawerWidth = 250;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    borderRadius: 16,
    height: '590px',
    marginTop: '170px',
    marginLeft: '10px',
    backgroundImage: `url('./img/фон.png')`,
    // backgroundColor: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    boxShadow: '1px 0px 5px 3px rgba(0,0,0,0.3)',
  },
  '& .MuiTypography-root': {
    color: 'black',
  },
});

const Navbar = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(location.pathname);

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

  const user = {
    name: 'Иван Иванов',
    avatarUrl: './img/avatar.jpg',
  };

  const navLinks = [
    { path: '/auth/login', name: 'Авторизация', icon: <AccountCircle /> },
    { path: '/handbook', name: 'Справочник', icon: <MenuBook /> },
    { path: '/tree', name: 'Структура компании', icon: <PeopleAlt /> },
    { path: '/applications', name: 'Заявки', icon: <Inbox /> },
    { path: '/newslist', name: 'Новости компании', icon: <MailIcon /> },
    { path: '/', name: 'Главная', icon: <Home /> },
    { path: '/chat', name: 'Чат', icon: <Chat /> },
    { path: '/documents', name: 'Документы', icon: <Description /> },
    { path: '/admin/employee', name: 'Добавить сотрудника', icon: <Description /> },
  ];

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Корпоративный портал
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ marginRight: 8 }}>
              {user.name}
            </Typography>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt={user.name} src={user.avatarUrl} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
              <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

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
