import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import {
  Avatar,
  Box,
  CardHeader,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { QUESTIONS } from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  cardStyle: {
    margin: "50px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    margin: "90px 0 40px 0",
  },
  table: {
    maxWidth: 500,
    maxHeight: 200,
  },
});
function createData(srno: number, date: string) {
  return { srno, date };
}

const rows = [
  createData(1, "22-07-2021"),
  createData(2, "22-07-2021"),
  createData(3, "22-07-2021"),
  createData(4, "22-07-2021"),
];

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Grid container style={{ marginTop: "200px" }} justify="center">
      <Grid xs={12} md={4}>
        <Card className={classes.cardStyle} variant="outlined">
          <CardHeader
            title="Profile"
            style={{ backgroundColor: "#3f51b5", color: "white" }}
          ></CardHeader>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar style={{ width: "75px", height: "75px" }} />
              <Typography color="textPrimary" gutterBottom variant="h4">
                User Name
              </Typography>
              <Typography color="textSecondary" variant="body1">
                user@deqode.com
              </Typography>
              <Typography color="textSecondary" variant="body1">
                <strong>Eth :</strong>
                0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
              </Typography>
              <Box>
                <LanguageIcon></LanguageIcon>&emsp;&emsp;
                <TelegramIcon></TelegramIcon>&emsp;&emsp;
                <LinkedInIcon></LinkedInIcon>&emsp;&emsp;
                <TwitterIcon></TwitterIcon>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card variant="outlined" className={classes.cardStyle}>
          <CardContent>
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              href={QUESTIONS}
            >
              New Submission
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card variant="outlined" className={classes.cardStyle}>
          <CardHeader
            title="History"
            style={{ backgroundColor: "#3f51b5", color: "white" }}
          ></CardHeader>
          <CardContent style={{ display: "flex", justifyContent: "center" }}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.srno}>
                      <TableCell component="th" scope="row">
                        Submission {row.srno}
                      </TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
