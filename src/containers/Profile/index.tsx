import React, { useState, useEffect } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LOGIN } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { Box, CardHeader, Grid, Step, StepLabel, Stepper, Tooltip, Card, CardActions, CardContent } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import LanguageIcon from "@material-ui/icons/Language";
import { LooseObjectInterface } from "../../interfaces/LooseObjectInterface";
import {
  SignupRequestInterface,
  SignUpErrorDataInterface,
  SignUpHelperTextDataInterface,
} from "../../interfaces/SignupInterface";
import { getUserProfile, updateUserProfile } from '../../services/Api/profile';
import { Chart } from "react-charts";

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateMobileNo(mobileNo: any) {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(mobileNo);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: "auto",
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
    "&:active": {
      color: "#3f51b5",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  field: {
    width: "90%",
  },
}));

const Profile = () => {
  const data = React.useMemo(
    () => [
      {
        label: "Test",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const classes = useStyles();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    telegramHandle: '',
    linkedInHandle: '',
    alternateContact: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      telegramHandle: '',
      linkedInHandle: '',
    },
    companyInformation: {
      entityName: '',
      tradeName: '',
      country: '',
      ethAddress: '',
      industry: '',
      website: '',
      linkedInProfile: '',
      twitterProfile: ''
    }
  } as SignupRequestInterface)

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
  });

  const [helperTextFields, setHelperTextFields] = useState({
    // primaryFirstNameHelperText: '',
    // primaryLastNameHelperText: '',
    primaryMobileNoHelperText: "",
    primaryEmailHelperText: "",
    // primaryTelegramHandleHelperText: '',
    // primaryLinkedInProfileHelperText: '',
    passwordHelperText: "",
    confirmPasswordHelperText: "",
    // alternateFirstNameHelperText: '',
    // alternateLastNameHelperText: '',
    alternateMobileNoHelperText: "",
    alternateEmailHelperText: "",
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
  });

  const [formError, setFormError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const formFields = [
    [
      {
        value: userData.firstName,
        type: 'text',
        label: 'First Name',
        required: true,
        name: 'firstName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.lastName,
        type: 'text',
        label: 'Last Name',
        required: true,
        name: 'lastName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.email,
        type: 'email',
        label: 'Email Address',
        required: true,
        name: 'email',
        needTooltip: false,
        errorFlag: errorFields.primaryEmailError,
        helperText: helperTextFields.primaryEmailHelperText,
        disabled: false,
      },
      {
        value: userData.mobileNumber,
        type: 'tel',
        label: 'Mobile Number',
        required: true,
        name: 'mobileNumber',
        needTooltip: false,
        errorFlag: errorFields.primaryMobileNoError,
        helperText: helperTextFields.primaryMobileNoHelperText,
        disabled: false,
      },
      {
        value: userData.telegramHandle,
        type: 'text',
        label: 'Telegram Handle',
        required: true,
        name: 'telegramHandle',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.linkedInHandle,
        type: 'url',
        label: 'LinkedIn Profile',
        required: true,
        name: 'linkedInHandle',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
    ],
    [
      {
        value: userData.alternateContact.firstName || '',
        type: 'text',
        label: 'First Name',
        required: false,
        name: 'firstName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.alternateContact.lastName || '',
        type: 'text',
        label: 'Last Name',
        required: false,
        name: 'lastName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.alternateContact.email || '',
        type: 'email',
        label: 'Email Address',
        required: false,
        name: 'email',
        needTooltip: false,
        errorFlag: errorFields.alternateEmailError,
        helperText: helperTextFields.alternateEmailHelperText,
        disabled: false,
      },
      {
        value: userData.alternateContact.mobileNumber || '',
        type: 'tel',
        label: 'Mobile Number',
        required: false,
        name: 'mobileNumber',
        needTooltip: false,
        errorFlag: errorFields.alternateMobileNoError,
        helperText: helperTextFields.alternateMobileNoHelperText,
        disabled: false,
      },
      {
        value: userData.alternateContact.telegramHandle || '',
        type: 'text',
        label: 'Telegram Handle',
        required: false,
        name: 'telegramHandle',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.alternateContact.linkedInHandle || '',
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInHandle',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
    ],
    [
      {
        value: userData.companyInformation.entityName,
        type: 'text',
        label: 'Borrower Entity Name',
        required: true,
        name: 'entityName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.companyInformation.tradeName || '',
        type: 'text',
        label: 'Trade Name/DBA',
        required: false,
        name: 'tradeName',
        needTooltip: true,
        toolTipNote: "Informal business name  for commercial purposes.",
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.companyInformation.country,
        type: 'text',
        label: 'Borrower Country',
        required: true,
        name: 'country',
        needTooltip: true,
        toolTipNote: "This field is not editable, it is populated by response from question in the attestation.",
        errorFlag: false,
        disabled: true,
      },
      {
        value: userData.companyInformation.ethAddress || '',
        type: 'text',
        label: 'ETH Address',
        required: false,
        name: 'ethAddress',
        needTooltip: true,
        toolTipNote: "ETH Address associated with your on-chain credit score. Please note changing this address may negatively impact your credit score.",
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.companyInformation.industry || '',
        type: 'text',
        label: 'Industry',
        required: false,
        name: 'industry',
        needTooltip: true,
        toolTipNote: "This field is not editable, it is populated by response from question in the attestation.",
        errorFlag: false,
        disabled: true,
      },
      {
        value: userData.companyInformation.website || '',
        type: 'url',
        label: 'Website',
        required: false,
        name: 'website',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.companyInformation.linkedInProfile || '',
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInProfile',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData.companyInformation.twitterProfile || '',
        type: 'url',
        label: 'Twitter Profile',
        required: false,
        name: 'twitterProfile',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
    ],
  ];

  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = ["Primary Contact", "Alternate Contact", "Company Information"];

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      dispatch(showLoading())
      try {
        const res = await getUserProfile();
        setUserData(res)
      }
      catch (err) {
        console.log(err)
      }
      dispatch(hideLoading())
    }

    fetchUserProfile();
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const data = { ...userData } as unknown as LooseObjectInterface
    switch (activeStep) {
      case 0:
        data[name] = e.target.value
        break;
      case 1:
        data['alternateContact'][name] = e.target.value
        break;
      case 2:
        data['companyInformation'][name] = e.target.value
        break;
    }
    setUserData({ ...(data as unknown as SignupRequestInterface) })
  }

  const handleValidation = () => {
    let validateFlag = true;
    let errorData = { ...errorFields } as LooseObjectInterface;
    let helperTextData = { ...helperTextFields } as LooseObjectInterface;

    switch (activeStep) {
      case 0:
        if (validateEmail(userData["email"])) {
          errorData["primaryEmailError"] = false;
          helperTextData["primaryEmailHelperText"] = "";
        } else {
          errorData["primaryEmailError"] = true;
          helperTextData["primaryEmailHelperText"] = "Please enter a valid email address.";
          validateFlag = false;
        }

        if (validateMobileNo(userData["mobileNumber"])) {
          errorData["primaryMobileNoError"] = false;
          helperTextData["primaryMobileNoHelperText"] = "";
        } else {
          errorData["primaryMobileNoError"] = true;
          helperTextData["primaryMobileNoHelperText"] = "Please enter a valid mobile no.";
          validateFlag = false;
        }
        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;

      case 1:
        if (userData.alternateContact.firstName && !validateEmail(userData.alternateContact.firstName)) {
          errorData["alternateEmailError"] = true;
          helperTextData["alternateEmailHelperText"] =
            "Please enter a valid email address.";
          validateFlag = false;
        } else {
          errorData["alternateEmailError"] = false;
          helperTextData["alternateEmailHelperText"] = "";
        }

        if (userData.alternateContact.mobileNumber && !validateMobileNo(userData.alternateContact.mobileNumber)) {
          errorData["alternateMobileNoError"] = true;
          helperTextData["alternateMobileNoHelperText"] =
            "Please enter a valid mobile no.";
          validateFlag = false;
        } else {
          errorData["alternateMobileNoError"] = false;
          helperTextData["alternateMobileNoHelperText"] = "";
        }
        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;

      case 2:
        return validateFlag;
    }
  };

  const handleSave = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (handleValidation()) {
      if (activeStep === tabs.length - 1) {
        dispatch(showLoading());
        try {
          await updateUserProfile(userData);
        } catch (err) {
          console.log(err);
          setFormError(err.response.data.message);
        }
        setIsEdit(false)
        setActiveStep(0)
        dispatch(hideLoading());
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  return (
    <Grid container style={{ padding: "50px" }}>
      <Grid item xs={12} md={6} lg={6}>
        {
          (isEdit) ?
            <div className={classes.paper}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                style={{ width: "100%" }}
              >
                {tabs.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <FormHelperText component="p" error={true}>
                {formError}
              </FormHelperText>
              <form className={classes.form} onSubmit={handleSave}>
                {formFields[activeStep].map((field: any) =>
                  field.needTooltip ? (
                    <Tooltip title={field.toolTipNote || ""}>
                      <TextField
                        value={field.value}
                        type={field.type}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, field.name)}
                        variant="outlined"
                        margin="normal"
                        required={field.required}
                        fullWidth
                        label={field.label}
                        disabled={field.disabled}
                        className={classes.field}
                        {...(field.errorFlag && {
                          error: true,
                          helperText: field.helperText,
                        })}
                      />
                    </Tooltip>
                  ) : (
                    <TextField
                      value={field.value}
                      type={field.type}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, field.name)}
                      variant="outlined"
                      margin="normal"
                      required={field.required}
                      fullWidth
                      label={field.label}
                      disabled={field.disabled}
                      className={classes.field}
                      {...(field.errorFlag && {
                        error: true,
                        helperText: field.helperText,
                      })}
                    />
                  )
                )}
                <div className={classes.submit}>
                  <Button
                    disabled={activeStep === 0}
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      setActiveStep((prevActiveStep) => prevActiveStep - 1)
                    }
                    style={{ marginRight: "40px" }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "40px" }}
                  >
                    {activeStep === tabs.length - 1 ? "Save" : "Next"}
                  </Button>
                </div>
              </form>
            </div> :
            <div>
              <Card
                style={{
                  minWidth: 400,
                  display: "inline-block",
                  minHeight: 350,
                  marginTop: "20px",
                }}
              >
                <CardHeader title="Primary Contact"></CardHeader>
                <CardContent>
                  <Box>
                    <strong>First Name :</strong> {userData.firstName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Last Name :</strong> {userData.lastName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Email Address :</strong> {userData.email}
                  </Box>
                  <br />
                  <Box>
                    <strong>Email Address :</strong> {userData.mobileNumber}
                  </Box>
                  <br />
                  <Box>
                    <strong><TelegramIcon /></strong>{" "}
                    {userData.telegramHandle}
                  </Box>
                  <br />
                  <Box>
                    <strong><LinkedInIcon />Linkedin Profile :</strong>{" "}
                    {userData.linkedInHandle}
                  </Box>
                  <br />
                </CardContent>
              </Card>
              <Card
                style={{
                  minWidth: 400,
                  display: "inline-block",
                  minHeight: 350,
                  marginTop: "20px",
                }}
              >
                {" "}
                <CardHeader title="Alternate Contact"></CardHeader>
                <CardContent>
                  <Box>
                    <strong>First Name :</strong> {userData.alternateContact.firstName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Last Name :</strong> {userData.alternateContact.lastName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Email Address :</strong> {userData.alternateContact.email}
                  </Box>
                  <br />
                  <Box>
                    <strong>Mobile Number :</strong> {userData.alternateContact.mobileNumber}
                  </Box>
                  <br />
                  <Box>
                    <strong><TelegramIcon /></strong>{" "}
                    {userData.alternateContact.telegramHandle}
                  </Box>
                  <br />
                  <Box>
                    <strong><LinkedInIcon />Linkedin Profile :</strong>{" "}
                    {userData.alternateContact.linkedInHandle}
                  </Box>
                  <br />
                </CardContent>
              </Card>
              <Card
                style={{
                  minWidth: 400,
                  display: "inline-block",
                  minHeight: 350,
                  marginTop: "20px",
                }}
              >
                <CardHeader title="Company Information"></CardHeader>
                <CardContent>
                  <Box>
                    <strong>Borrower Entity Name :</strong> {userData.companyInformation.entityName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Trade Name/DBA :</strong> {userData.companyInformation.tradeName}
                  </Box>
                  <br />
                  <Box>
                    <strong>Borrower Country :</strong> {userData.companyInformation.country}
                  </Box>
                  <br />
                  <Box>
                    <strong>ETH Address</strong> {userData.companyInformation.ethAddress}
                  </Box>
                  <br />
                  <Box>
                    <strong>Industry :</strong> {userData.companyInformation.industry}
                  </Box>
                  <br />
                  <Box>
                    <strong><LanguageIcon />Website :</strong>{" "}
                    {userData.companyInformation.website}
                  </Box>
                  <br />
                  <Box>
                    <strong><LinkedInIcon />LinkedIn Profile :</strong>{" "}
                    {userData.companyInformation.linkedInProfile}
                  </Box>
                  <br />
                  <Box>
                    <strong><TwitterIcon /> Twitter Profile :</strong>{" "}
                    {userData.companyInformation.twitterProfile}
                  </Box>
                  <br />
                </CardContent>
              </Card>
              <br />
              <Button
                variant="contained"
                color="primary"
                // style={{ marginRight: "40px" }}
                onClick={(e) => setIsEdit(true)}
              >
                Edit
              </Button>
            </div>}
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Chart data={data} axes={axes} />
      </Grid>
    </Grid>
  );
};

export default Profile;
