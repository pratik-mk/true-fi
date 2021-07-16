import React, { useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import { signup } from '../../services/Api/authuser';
import { LOGIN } from '../../constants/routes';
import { useHistory } from 'react-router-dom';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [helptext, setHelptext] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState('');

  const history = useHistory();

  const handleValidation = () => {
    let validateFlag = true
    if (password === repassword) {
      setPasswordError(false)
      setHelptext('')
      if (password.length >= 4) {
        setPasswordError(false);
        setHelptext('')
      }
      else {
        setPasswordError(true);
        setHelptext('Password should be more than 4 character !!!');
        validateFlag = false
      }
    }
    else {
      setPasswordError(true);
      setHelptext('Password didnt match')
      validateFlag = false
    }
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
        await signup({ name, email, password });
        history.push(LOGIN);
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
          Sign Up
        </Typography>
        <FormHelperText component="p" error={true}>
          {formError}
        </FormHelperText>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            value={name}
            type='text'
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...(emailError && { error: true, helperText: 'Please enter a valid email' })}
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
            autoComplete="current-password"
            helperText={helptext}
            {...(passwordError && { error: true })}
          //{...(passwordError && {error:true, helperText: 'password didnt match and password should be more than 4 character'})}
          />
          <TextField
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            helperText={helptext}
            {...(passwordError && { error: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link href={LOGIN} variant="body2">
            {"Already have an account? Sign in"}
          </Link>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}