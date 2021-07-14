import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src='https://dev-lender-portal.netlify.app/static/media/logo.c44faacb.svg' alt="true-fi"></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
