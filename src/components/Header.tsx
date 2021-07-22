import { AppBar, Button, IconButton, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import React from 'react';
//import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { LOGIN, PROFILE } from "../constants/routes";
import { TOKEN, LATEST_QUESTION_ID } from "../constants/text";
import { logout } from "../services/Api/authuser"
import { removeItemFromLocalStorage } from "../utils/localstorage";
import logo from '../assets/logo.svg'
import profile_pic from '../assets/profile_pic.png'
import logout_pic from '../assets/logout_pic.png'

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
  logo: {
    padding: "2px",
    margin: "0px 20px 0px -40px"
  },
  profile: {
    height: "25px",
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
  // const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {
  //   if (showMenu) {
  //     document.addEventListener('click', closeMenu)
  //   }
  //   return () => document.removeEventListener('click', closeMenu)
  // }, [showMenu])

  const handleLogout = async (event: React.SyntheticEvent): Promise<void> => {
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
      // setShowMenu(false);
      history.push(LOGIN);
    }
  }

  // const closeMenu = () => {
  //   setShowMenu(false)
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={logo} alt="truefi" className={classes.logo}></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {isLoggedIn ?
            <div>
              <Tooltip title="Profile"><Button onClick={(e) => history.push(PROFILE)}><img src={profile_pic} className={classes.profile} alt="Profile" /></Button></Tooltip>
              <Tooltip title="Logout"><Button onClick={handleLogout}><img src={logout_pic} className={classes.profile} alt="Logout" /></Button></Tooltip>
            </div>
            // <div className="dropdown">
            //   <Button className="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => setShowMenu(true)}><img src={profile_pic} className={classes.profile} alt="Menu" /></Button>
            //   <Menu
            //     id="simple-menu"
            //     // getContentAnchorEl={null}
            //     style={{ zIndex: 9999 }}
            //     open={showMenu}
            //     onClose={closeMenu}
            //     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            //     transformOrigin={{ vertical: "top", horizontal: "right" }}
            //   >
            //     <MenuItem className="dropdown-item" onClick={(e) => history.push(PROFILE)}>Profile</MenuItem>
            //     <MenuItem className="dropdown-item" onClick={handleLogout}>Logout</MenuItem>
            //   </Menu>
            // </div>
            : <Button name="login" color="inherit" onClick={() => { history.push(LOGIN) }}>Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header