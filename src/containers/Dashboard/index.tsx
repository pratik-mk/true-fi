import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import LanguageIcon from "@material-ui/icons/Language";
import { getUserProfile } from '../../services/Api/profile';
import { showLoading, hideLoading } from '../../reducers/loaderSlice';
import {
  Box,
  Button,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { SignupRequestInterface } from "../../interfaces/SignupInterface";
import { LooseObjectInterface } from "../../interfaces/LooseObjectInterface";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  cardTable: {
    display: "flex",
    justifyContent: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    maxWidth: 500,
    maxHeight: 200,
  },
  cardHead: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
});

export default function Dashboard() {
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

  const formFields = [
    {
      value: userData.firstName,
      type: 'text',
      label: 'First Name',
      required: true,
      name: 'firstName',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.lastName,
      type: 'text',
      label: 'Last Name',
      required: true,
      name: 'lastName',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.email,
      type: 'email',
      label: 'Email Address',
      required: true,
      name: 'email',
      needTooltip: false,
      // errorFlag: errorFields.primaryEmailError,
      // helperText: helperTextFields.primaryEmailHelperText
    },
    {
      value: userData.mobileNumber,
      type: 'tel',
      label: 'Mobile Number',
      required: true,
      name: 'mobileNumber',
      needTooltip: false,
      // errorFlag: errorFields.primaryMobileNoError,
      // helperText: helperTextFields.primaryMobileNoHelperText
    },
    {
      value: userData.telegramHandle,
      type: 'url',
      label: 'Telegram Handle',
      required: true,
      name: 'telegramHandle',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.linkedInHandle,
      type: 'url',
      label: 'LinkedIn Profile',
      required: true,
      name: 'linkedInHandle',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.alternateContact.firstName,
      type: 'text',
      label: 'First Name',
      required: false,
      name: 'firstName',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.alternateContact.lastName,
      type: 'text',
      label: 'Last Name',
      required: false,
      name: 'lastName',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.alternateContact.email,
      type: 'email',
      label: 'Email Address',
      required: false,
      name: 'email',
      needTooltip: false,
      // errorFlag: errorFields.alternateEmailError,
      // helperText: helperTextFields.alternateEmailHelperText
    },
    {
      value: userData.alternateContact.mobileNumber,
      type: 'tel',
      label: 'Mobile Number',
      required: false,
      name: 'mobileNumber',
      needTooltip: false,
      // errorFlag: errorFields.alternateMobileNoError,
      // helperText: helperTextFields.alternateMobileNoHelperText
    },
    {
      value: userData.alternateContact.telegramHandle,
      type: 'url',
      label: 'Telegram Handle',
      required: false,
      name: 'telegramHandle',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.alternateContact.linkedInHandle,
      type: 'url',
      label: 'LinkedIn Profile',
      required: false,
      name: 'linkedInHandle',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.companyInformation.entityName,
      type: 'text',
      label: 'Borrower Entity Name',
      required: true,
      name: 'entityName',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.companyInformation.tradeName,
      type: 'text',
      label: 'Trade Name/DBA',
      required: false,
      name: 'tradeName',
      needTooltip: true,
      toolTipNote: "Informal business name  for commercial purposes.",
      errorFlag: false,
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
    },
    {
      value: userData.companyInformation.ethAddress,
      type: 'text',
      label: 'ETH Address',
      required: false,
      name: 'ethAddress',
      needTooltip: true,
      toolTipNote: "ETH Address associated with your on-chain credit score. Please note changing this address may negatively impact your credit score.",
      errorFlag: false,
    },
    {
      value: userData.companyInformation.industry,
      type: 'text',
      label: 'Industry',
      required: false,
      name: 'industry',
      needTooltip: true,
      toolTipNote: "This field is not editable, it is populated by response from question in the attestation.",
      errorFlag: false,
    },
    {
      value: userData.companyInformation.website,
      type: 'url',
      label: 'Website',
      required: false,
      name: 'website',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.companyInformation.linkedInProfile,
      type: 'url',
      label: 'LinkedIn Profile',
      required: false,
      name: 'linkedInProfile',
      needTooltip: false,
      errorFlag: false,
    },
    {
      value: userData.companyInformation.twitterProfile,
      type: 'url',
      label: 'Twitter Profile',
      required: false,
      name: 'twitterProfile',
      needTooltip: false,
      errorFlag: false,
    },
  ]
  // const [isEdit, setIsEdit] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      dispatch(showLoading())
      try {
        const res = await getUserProfile();
        setUserData(res)
        dispatch(hideLoading())
      }
      catch (err) {
        console.log(err)
        dispatch(hideLoading())
      }
    }

    fetchUserProfile();
    // eslint-disable-next-line
  }, [])

  // const updateProfile = async (): Promise<void> => {
  //   if (isEdit) {
  //     dispatch(showLoading())
  //     try {
  //       // await updateUserProfile(userData);
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //     setIsEdit(false)
  //     dispatch(hideLoading())
  //   } else {
  //     setIsEdit(true)
  //   }
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const data = { ...userData } as unknown as LooseObjectInterface
    data[name] = e.target.value
    setUserData({ ...(data as unknown as SignupRequestInterface) })
  }

  function createData(srno: string, date: string, score: number) {
    return { srno, date, score };
  }

  const rows = [
    createData("#1", "22-07-2021", 10),
    createData("#2", "22-07-2021", 11),
    createData("#3", "22-07-2021", 12),
    createData("#4", "22-07-2021", 13),
  ];

  return (
    <div>
      if (isEdit) {
        formFields.map((field: any) =>
          <TextField
            value={field.value}
            type={field.type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, field.name)}
            variant="outlined"
            margin="normal"
            required={field.required}
            fullWidth
            label={field.label}
            // className={classes.field}
            {...(field.errorFlag && { error: true, helperText: field.helperText })}
          />)
      } else {
        <div>
          <div>
            <Card
              style={{
                minWidth: 400,
                display: "inline-block",
                minHeight: 350,
                marginTop: "50px",
              }}
            >
              <CardHeader title="Primary Profile"></CardHeader>
              <CardContent>
                <Box>
                  <strong>First Name :</strong> {userData.firstName}
                </Box>
                <hr />
                <Box>
                  <strong>Last Name :</strong> {userData.lastName}
                </Box>
                <hr />
                <Box>
                  <strong>Email Address :</strong> {userData.email}
                </Box>
                <hr />
                <Box>
                  <strong>Email Address :</strong> {userData.mobileNumber}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <TelegramIcon />
                  </strong>{" "}
                  {userData.telegramHandle}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <LinkedInIcon />
                Linkedin Profile :
              </strong>{" "}
                  {userData.linkedInHandle}
                </Box>
                <hr />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary">
                  Edit
            </Button>
              </CardActions>
            </Card>
            <Card
              style={{
                minWidth: 400,
                display: "inline-block",
                minHeight: 350,
                marginTop: "50px",
              }}
            >
              {" "}
              <CardHeader title="Alternate Profile"></CardHeader>
              <CardContent>
                <Box>
                  <strong>First Name :</strong> {userData.alternateContact.firstName}
                </Box>
                <hr />
                <Box>
                  <strong>Last Name :</strong> {userData.alternateContact.lastName}
                </Box>
                <hr />
                <Box>
                  <strong>Email Address :</strong> {userData.alternateContact.email}
                </Box>
                <hr />
                <Box>
                  <strong>Mobile Number :</strong> {userData.alternateContact.mobileNumber}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <TelegramIcon />
                  </strong>{" "}
                  {userData.alternateContact.telegramHandle}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <LinkedInIcon />
                Linkedin Profile :
              </strong>{" "}
                  {userData.alternateContact.linkedInHandle}
                </Box>
                <hr />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary">
                  Edit
            </Button>
              </CardActions>
            </Card>
            <Card
              style={{
                minWidth: 400,
                display: "inline-block",
                minHeight: 350,
                marginTop: "50px",
              }}
            >
              <CardHeader title="Company Information"></CardHeader>
              <CardContent>
                <Box>
                  <strong>Borrower Entity Name :</strong> {userData.companyInformation.entityName}
                </Box>
                <hr />
                <Box>
                  <strong>Trade Name/DBA :</strong> {userData.companyInformation.tradeName}
                </Box>
                <hr />
                <Box>
                  <strong>Borrower Country :</strong> {userData.companyInformation.country}
                </Box>
                <hr />
                <Box>
                  <strong>ETH Address</strong> {userData.companyInformation.ethAddress}
                </Box>
                <hr />
                <Box>
                  <strong>Industry :</strong> {userData.companyInformation.industry}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <LanguageIcon />
                Website :
              </strong>{" "}
                  {userData.companyInformation.website}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <LinkedInIcon />
                LinkedIn Profile :
              </strong>{" "}
                  {userData.companyInformation.linkedInProfile}
                </Box>
                <hr />
                <Box>
                  <strong>
                    <TwitterIcon /> Twitter Profile :
              </strong>{" "}
                  {userData.companyInformation.twitterProfile}
                </Box>
                <hr />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary">
                  Edit
            </Button>
              </CardActions>
            </Card>
          </div>
          <div>
            <Card
              style={{
                minWidth: " 500px",
                display: "inline-block",
              }}
            >
              <CardContent className={classes.cardTable}>
                <TableContainer component={Paper} className={classes.table}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Sr no</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Date</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Score</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.srno}>
                          <TableCell component="th" scope="row">
                            {row.srno}
                          </TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </div>}
    </div>
  );
}
