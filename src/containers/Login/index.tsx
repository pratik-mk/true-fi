import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DASHBOARD, SIGNUP } from '../../constants/routes';
import { login } from '../../services/Api/authuser';
import { TOKEN } from '../../constants/text';
import { setItemInLocalStorage } from '../../utils/localstorage';
import { useHistory } from 'react-router-dom';
import { FormHelperText } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TrueFi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = (props): JSX.Element => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState('');

  const history = useHistory();
  const { setLoggedIn } = props;

  const handleValidation = () => {
    let validateFlag = true;
    if (validateEmail(email)) {
      setEmailError(false);
    }
    else {
      setEmailError(true);
      validateFlag = false
    }
    return validateFlag
  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const res = await login({ email, password });
        let date = new Date();
        date.setSeconds(date.getSeconds() + res.expiresIn)
        const tokenObj = {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          expiresIn: date.getTime()
        };
        setItemInLocalStorage(TOKEN, JSON.stringify(tokenObj));
        setLoggedIn(true);
        history.push(DASHBOARD);
      }
      catch (err) {
        console.log(err);
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormHelperText component="p" error={true}>
          {formError}
        </FormHelperText>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...(emailError && { error: true, helperText: 'email is not valid' })}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          // {...(errors && {error:true, helperText: 'cannot be blank'})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href={SIGNUP} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container >
  );
}

export default Login