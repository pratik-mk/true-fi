import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import LanguageIcon from "@material-ui/icons/Language";
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
} from "@material-ui/core";

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
              <strong>First Name :</strong> User
            </Box>
            <hr />
            <Box>
              <strong>Last Name :</strong> name
            </Box>
            <hr />
            <Box>
              <strong>Email Address :</strong> user@user.com
            </Box>
            <hr />
            <Box>
              <strong>
                <TelegramIcon />
              </strong>{" "}
              @Username
            </Box>
            <hr />
            <Box>
              <strong>
                <LinkedInIcon />
                Linkedin Profile :
              </strong>{" "}
              User name
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
              <strong>First Name :</strong> User
            </Box>
            <hr />
            <Box>
              <strong>Last Name :</strong> name
            </Box>
            <hr />
            <Box>
              <strong>Email Address :</strong> user@user.com
            </Box>
            <hr />
            <Box>
              <strong>
                <TelegramIcon />
              </strong>{" "}
              @Username
            </Box>
            <hr />
            <Box>
              <strong>
                <LinkedInIcon />
                Linkedin Profile :
              </strong>{" "}
              User name
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
              <strong>Borrower Entity Name :</strong> User
            </Box>
            <hr />
            <Box>
              <strong>Trade Name/DBA :</strong> name
            </Box>
            <hr />
            <Box>
              <strong>Borrower Country :</strong> user@user.com
            </Box>
            <hr />
            <Box>
              <strong>ETH Address</strong> @Username
            </Box>
            <hr />
            <Box>
              <strong>Industry :</strong> User name
            </Box>
            <hr />
            <Box>
              <strong>
                <LanguageIcon />
                Website :
              </strong>{" "}
              User name
            </Box>
            <hr />
            <Box>
              <strong>
                <LinkedInIcon />
                LinkedIn Profile :
              </strong>{" "}
              User name
            </Box>
            <hr />
            <Box>
              <strong>
                <TwitterIcon /> Twitter Profile :
              </strong>{" "}
              User name
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
                        Submission {row.srno}
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
    </div>
  );
}
