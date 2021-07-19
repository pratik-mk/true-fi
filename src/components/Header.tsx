import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
//import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { LOGIN } from "../constants/routes";
import { TOKEN, LATEST_QUESTION_ID } from "../constants/text";
import { logout } from "../services/Api/authuser"
import { removeItemFromLocalStorage } from "../utils/localstorage";
import logo from '../assets/logo.svg'

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

type HeaderProps = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const { isLoggedIn, setLoggedIn } = props;

  const handleClick = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    try {
      await logout();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      removeItemFromLocalStorage(TOKEN);
      removeItemFromLocalStorage(LATEST_QUESTION_ID);
      setLoggedIn(false);
      history.push(LOGIN);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={logo} alt="truefi"></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {isLoggedIn ? <Button name="logout" color="inherit" onClick={handleClick}>Logout</Button> : <Button name="login" color="inherit" onClick={() => { history.push(LOGIN) }}>Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header