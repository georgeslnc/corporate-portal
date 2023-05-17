import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { AccountCircle, Chat, Description, Home, Inbox, MenuBook, PeopleAlt } from '@material-ui/icons';
import useStyles from './navbarStyles';

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
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
  ];

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Корпоративный портал
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List className={classes.listItemHover}>
          {navLinks.map(({ path, name, icon }) => (
            <ListItem
              button
              component={Link}
              to={path}
              key={name}
              onClick={() => handleLinkClick(path)}
              className={path === activeLink ? classes.activeLink : ''}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
