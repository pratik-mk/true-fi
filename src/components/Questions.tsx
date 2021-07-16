import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  LinearProgress,
  LinearProgressProps,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  progressBar: {
    width: "100%",
    margin: "20px",
  },
  questionCard: {
    minWidth: 275,
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
});

export default function Questions() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    //style={{backgroundColor: '#e8efff'}}
    <Container fixed>
      <div className={classes.progressBar}>
        <LinearProgressWithLabel value={progress} />
      </div>
      <Card className={classes.questionCard} style={{ marginTop: "50px" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            Who is Prime Minister of India?
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
            style={{ marginLeft: "20px" }}
          >
            Chowkidar
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="question" name="question">
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="No"
              />
              <FormControlLabel
                value="maybe"
                control={<Radio color="primary" />}
                label="Maybe"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <Button
          color="primary"
          size="small"
          style={{ float: "right", margin: "5px" }}
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Button>
      </Card>

      <Card className={classes.questionCard} style={{ marginTop: "50px" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            Who is Prime Minister of India?
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
            style={{ marginLeft: "20px" }}
          >
            Chowkidar
          </Typography>
          <FormControl component="fieldset" style={{ alignItems: "left" }}>
            <TextField
              required
              multiline
              label="Ans"
              variant="outlined"
              style={{ width: 500 }}
            />
          </FormControl>
        </CardContent>
        <Button
          color="primary"
          size="small"
          style={{ float: "right", margin: "5px" }}
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Button>
      </Card>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ margin: "25px" }}
      >
        Submit
      </Button>
    </Container>
  );
}
