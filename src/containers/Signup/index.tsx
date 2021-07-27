import React, { useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from '../../services/Api/authuser';
import { LOGIN } from '../../constants/routes';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../reducers/loaderSlice';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import { LooseObjectInterface } from '../../interfaces/LooseObjectInterface';
import { SignUpDataInterface, SignUpErrorDataInterface, SignUpHelperTextDataInterface } from '../../interfaces/SignupInterface';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to={"https://material-ui.com/"} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.54)' }}>
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

function validateMobileNo(mobileNo: any) {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(mobileNo)
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
    alignSelf: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
    '&:active': {
      color: '#3f51b5',
    },
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  field: {
    width: '90%',
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [registrationData, setRegistrationData] = useState({
    primaryFirstName: '',
    primaryLastName: '',
    primaryMobileNo: '',
    primaryEmail: '',
    primaryTelegramHandle: '',
    primaryLinkedInProfile: '',
    password: '',
    confirmPassword: '',
    alternateFirstName: '',
    alternateLastName: '',
    alternateMobileNo: '',
    alternateEmail: '',
    alternateTelegramHandle: '',
    alternateLinkedInProfile: '',
    borrowerEntityName: '',
    tradeName: '',
    borrowerCountry: '',
    ethAddress: '',
    industry: '',
    website: '',
    linkedInProfile: '',
    twitterProfile: '',
  })
  const [errorFields, setErrorFields] = useState({
    // primaryFirstNameError: false,
    // primaryLastNameError: false,
    primaryMobileNoError: false,
    primaryEmailError: false,
    // primaryTelegramHandleError: false,
    // primaryLinkedInProfileError: false,
    passwordError: false,
    confirmPasswordError: false,
    // alternateFirstNameError: false,
    // alternateLastNameError: false,
    alternateMobileNoError: false,
    alternateEmailError: false,
    // alternateTelegramHandleError: false,
    // alternateLinkedInProfileError: false,
    // borrowerEntityNameError: false,
    // tradeNameError: false,
    // borrowerCountryError: false,
    // ethAddressError: false,
    // industryError: false,
    // websiteError: false,
    // linkedInProfileError: false,
    // twitterProfileError: false,
  })
  const [helperTextFields, setHelperTextFields] = useState({
    // primaryFirstNameHelperText: '',
    // primaryLastNameHelperText: '',
    primaryMobileNoHelperText: '',
    primaryEmailHelperText: '',
    // primaryTelegramHandleHelperText: '',
    // primaryLinkedInProfileHelperText: '',
    passwordHelperText: '',
    confirmPasswordHelperText: '',
    // alternateFirstNameHelperText: '',
    // alternateLastNameHelperText: '',
    alternateMobileNoHelperText: '',
    alternateEmailHelperText: '',
    // alternateTelegramHandleHelperText: '',
    // alternateLinkedInProfileHelperText: '',
    // borrowerEntityNameHelperText: '',
    // tradeNameHelperText: '',
    // borrowerCountryHelperText: '',
    // ethAddressHelperText: '',
    // industryHelperText: '',
    // websiteHelperText: '',
    // linkedInProfileHelperText: '',
    // twitterProfileHelperText: '',
  })

  const [formError, setFormError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const formFields = [
    [
      {
        value: registrationData.primaryFirstName,
        type: 'text',
        label: 'First Name',
        required: true,
        name: 'primaryFirstName',
        errorFlag: false,
      },
      {
        value: registrationData.primaryLastName,
        type: 'text',
        label: 'Last Name',
        required: true,
        name: 'primaryLastName',
        errorFlag: false,
      },
      {
        value: registrationData.primaryEmail,
        type: 'email',
        label: 'Email Address',
        required: true,
        name: 'primaryEmail',
        errorFlag: errorFields.primaryEmailError,
        helperText: helperTextFields.primaryEmailHelperText
      },
      {
        value: registrationData.primaryMobileNo,
        type: 'tel',
        label: 'Mobile Number',
        required: true,
        name: 'primaryMobileNo',
        errorFlag: errorFields.primaryMobileNoError,
        helperText: helperTextFields.primaryMobileNoHelperText
      },
      {
        value: registrationData.primaryTelegramHandle,
        type: 'text',
        label: 'Telegram Handle',
        required: true,
        name: 'primaryTelegramHandle',
        errorFlag: false,
      },
      {
        value: registrationData.primaryLinkedInProfile,
        type: 'url',
        label: 'LinkedIn Profile',
        required: true,
        name: 'primaryLinkedInProfile',
        errorFlag: false,
      },
      {
        value: registrationData.password,
        type: 'password',
        label: 'Password',
        required: true,
        name: 'password',
        errorFlag: errorFields.passwordError,
        helperText: helperTextFields.passwordHelperText
      },
      {
        value: registrationData.confirmPassword,
        type: 'password',
        label: 'Confirm Password',
        required: true,
        name: 'confirmPassword',
        errorFlag: errorFields.confirmPasswordError,
        helperText: helperTextFields.confirmPasswordHelperText
      },
    ],
    [
      {
        value: registrationData.alternateFirstName,
        type: 'text',
        label: 'First Name',
        required: false,
        name: 'alternateFirstName',
        errorFlag: false,
      },
      {
        value: registrationData.alternateLastName,
        type: 'text',
        label: 'Last Name',
        required: false,
        name: 'alternateLastName',
        errorFlag: false,
      },
      {
        value: registrationData.alternateEmail,
        type: 'email',
        label: 'Email Address',
        required: false,
        name: 'alternateEmail',
        errorFlag: errorFields.alternateEmailError,
        helperText: helperTextFields.alternateEmailHelperText
      },
      {
        value: registrationData.alternateMobileNo,
        type: 'tel',
        label: 'Mobile Number',
        required: false,
        name: 'alternateMobileNo',
        errorFlag: errorFields.alternateMobileNoError,
        helperText: helperTextFields.alternateMobileNoHelperText
      },
      {
        value: registrationData.alternateTelegramHandle,
        type: 'text',
        label: 'Telegram Handle',
        required: false,
        name: 'alternateTelegramHandle',
        errorFlag: false,
      },
      {
        value: registrationData.alternateLinkedInProfile,
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'alternateLinkedInProfile',
        errorFlag: false,
      }
    ],
    [
      {
        value: registrationData.borrowerEntityName,
        type: 'text',
        label: 'Borrower Entity Name',
        required: true,
        name: 'borrowerEntityName',
        errorFlag: false,
      },
      {
        value: registrationData.tradeName,
        type: 'text',
        label: 'Trade Name/DBA',
        required: false,
        name: 'tradeName',
        errorFlag: false,
      },
      {
        value: registrationData.borrowerCountry,
        type: 'text',
        label: 'Borrower Country',
        required: true,
        name: 'borrowerCountry',
        errorFlag: false,
      },
      {
        value: registrationData.ethAddress,
        type: 'text',
        label: 'ETH Address',
        required: false,
        name: 'ethAddress',
        errorFlag: false,
      },
      {
        value: registrationData.industry,
        type: 'text',
        label: 'Industry',
        required: false,
        name: 'industry',
        errorFlag: false,
      },
      {
        value: registrationData.website,
        type: 'url',
        label: 'Website',
        required: false,
        name: 'website',
        errorFlag: false,
      },
      {
        value: registrationData.linkedInProfile,
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInProfile',
        errorFlag: false,
      },
      {
        value: registrationData.twitterProfile,
        type: 'url',
        label: 'Twitter Profile',
        required: false,
        name: 'twitterProfile',
        errorFlag: false,
      },
    ],
  ]

  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = ["Primary Contact", "Alternate Contact", "Company Information"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const data = { ...registrationData } as LooseObjectInterface
    data[name] = e.target.value
    setRegistrationData({ ...(data as unknown as SignUpDataInterface) });
  }

  const handleValidation = () => {
    let validateFlag = true
    let errorData = { ...errorFields } as LooseObjectInterface
    let helperTextData = { ...helperTextFields } as LooseObjectInterface

    switch (activeStep) {
      case 0:
        if (validateEmail(registrationData['primaryEmail'])) {
          errorData['primaryEmailError'] = false
          helperTextData['primaryEmailHelperText'] = ''
        }
        else {
          errorData['primaryEmailError'] = true
          helperTextData['primaryEmailHelperText'] = 'Please enter a valid email address.'
          validateFlag = false
        }

        if (registrationData['password'] === registrationData['confirmPassword']) {
          errorData['confirmPasswordError'] = false
          helperTextData['confirmPasswordHelperText'] = ''
          if (registrationData['password'].length >= 4) {
            errorData['passwordError'] = false
            helperTextData['passwordHelperText'] = ''
          }
          else {
            errorData['passwordError'] = true
            helperTextData['passwordHelperText'] = 'Password should be more than 4 character.'
            validateFlag = false
          }
        }
        else {
          errorData['confirmPasswordError'] = true
          helperTextData['confirmPasswordHelperText'] = 'Password did not match.'
          validateFlag = false
        }

        if (validateMobileNo(registrationData['primaryMobileNo'])) {
          errorData['primaryMobileNoError'] = false
          helperTextData['primaryMobileNoHelperText'] = ''
        }
        else {
          errorData['primaryMobileNoError'] = true
          helperTextData['primaryMobileNoHelperText'] = 'Please enter a valid mobile no.'
          validateFlag = false
        }
        setErrorFields({ ...(errorData as unknown as SignUpErrorDataInterface) })
        setHelperTextFields({ ...(helperTextData as unknown as SignUpHelperTextDataInterface) })
        return validateFlag

      case 1:
        if (registrationData['alternateEmail'] && !validateEmail(registrationData['alternateEmail'])) {
          errorData['alternateEmailError'] = true
          helperTextData['alternateEmailHelperText'] = 'Please enter a valid email address.'
          validateFlag = false
        }
        else {
          errorData['alternateEmailError'] = false
          helperTextData['alternateEmailHelperText'] = ''
        }

        if (registrationData['alternateMobileNo'] && !validateMobileNo(registrationData['alternateMobileNo'])) {
          errorData['alternateMobileNoError'] = true
          helperTextData['alternateMobileNoHelperText'] = 'Please enter a valid mobile no.'
          validateFlag = false
        }
        else {
          errorData['alternateMobileNoError'] = false
          helperTextData['alternateMobileNoHelperText'] = ''
        }
        setErrorFields({ ...(errorData as unknown as SignUpErrorDataInterface) })
        setHelperTextFields({ ...(helperTextData as unknown as SignUpHelperTextDataInterface) })
        return validateFlag

      case 2:
        return validateFlag
    }
  }

  const prepareDataObj = () => {
    const dataObj: any = {
      firstName: registrationData['primaryFirstName'],
      lastName: registrationData['primaryLastName'],
      email: registrationData['primaryEmail'],
      password: registrationData['password'],
      mobileNumber: registrationData['primaryMobileNo'],
      companyInformation: {
        entityName: registrationData['borrowerEntityName'],
        country: registrationData['borrowerCountry'],
      },
    };
    if (registrationData['primaryTelegramHandle']) {
      dataObj.telegramHandle = registrationData['primaryTelegramHandle'];
    }
    if (registrationData['primaryLinkedInProfile']) {
      dataObj.linkedInHandle = registrationData['primaryLinkedInProfile'];
    }

    //alternate contact
    if (
      registrationData['alternateFirstName'] ||
      registrationData['alternateLastName'] ||
      registrationData['alternateEmail'] ||
      registrationData['alternateMobileNo'] ||
      registrationData['alternateTelegramHandle'] ||
      registrationData['alternateLinkedInProfile']
    ) {
      dataObj.alternateContact = {} as any;
      if (registrationData['alternateFirstName']) {
        dataObj.alternateContact.firstName = registrationData['alternateFirstName'];
      }
      if (registrationData['alternateLastName']) {
        dataObj.alternateContact.lastName = registrationData['alternateLastName'];
      }
      if (registrationData['alternateEmail']) {
        dataObj.alternateContact.email = registrationData['alternateEmail'];
      }
      if (registrationData['alternateMobileNo']) {
        dataObj.alternateContact.mobileNumber = registrationData['alternateMobileNo'];
      }
      if (registrationData['alternateTelegramHandle']) {
        dataObj.alternateContact.telegramHandle = registrationData['alternateTelegramHandle'];
      }
      if (registrationData['alternateLinkedInProfile']) {
        dataObj.alternateContact.linkedInHandle = registrationData['alternateLinkedInProfile'];
      }
    } else {
      dataObj.alternateContact = null
    }

    if (registrationData['borrowerCountry']) {
      dataObj.companyInformation.tradeName = registrationData['borrowerCountry'];
    }
    if (registrationData['ethAddress']) {
      dataObj.companyInformation.ethAddress = registrationData['ethAddress'];
    }
    if (registrationData['industry']) {
      dataObj.companyInformation.industry = registrationData['industry'];
    }
    if (registrationData['website']) {
      dataObj.companyInformation.website = registrationData['website'];
    }
    if (registrationData['linkedInProfile']) {
      dataObj.companyInformation.linkedInProfile = registrationData['linkedInProfile'];
    }
    if (registrationData['twitterProfile']) {
      dataObj.companyInformation.twitterProfile = registrationData['twitterProfile'];
    }

    return dataObj
  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (handleValidation()) {
      if (activeStep === tabs.length - 1) {
        dispatch(showLoading());
        const dataObj = prepareDataObj();
        try {
          await signup(dataObj);
          dispatch(hideLoading());
          history.push(LOGIN);
        }
        catch (err) {
          console.log(err);
          setFormError(err.response.data.message);
          dispatch(hideLoading());
        }
      }
      else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5"
          gutterBottom
          color="primary"
          style={{ padding: "0 10px" }}
        >
          Sign Up
        </Typography>
        <Typography gutterBottom>
          Please fill out the fields listed below. Note that any fields left intentionally blank may have impact on your credit score.
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel style={{ width: '100%' }}>
          {tabs.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <FormHelperText component="p" error={true}>
          {formError}
        </FormHelperText>
        <form className={classes.form} onSubmit={handleSubmit}>
          {
            formFields[activeStep].map((field: any) =>
              <TextField
                value={field.value}
                type={field.type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, field.name)}
                variant="outlined"
                margin="normal"
                required={field.required}
                fullWidth
                label={field.label}
                className={classes.field}
                {...(field.errorFlag && { error: true, helperText: field.helperText })}
              />)
          }
          <div className={classes.submit}>
            <Button
              disabled={activeStep === 0}
              variant="contained"
              color="primary"
              onClick={(e) => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
              style={{ marginRight: '40px' }}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '0px' }}>
              {activeStep === tabs.length - 1 ? 'Sign Up' : 'Next'}
            </Button>
          </div>
          <Link to={LOGIN} className={classes.link}>
            Already have an account? Sign in
          </Link>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}