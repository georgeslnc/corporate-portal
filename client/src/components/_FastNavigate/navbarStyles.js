import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundImage: `url("./img/sidebar-4.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  activeLink: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(128, 128, 128, 0)',
    },
  },
  listItemHover: {
    '& .MuiListItem-button:hover': {
      backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
  },
}));

export default useStyles;

