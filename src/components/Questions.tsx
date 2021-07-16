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
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
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
    textAlign: "left",
    margin: "10px",
    borderStyle: "ridge",
    marginTop: "50px",
  },
  answerBorder: {
    width: "100%",
    borderStyle: "none",
    backgroundColor: "#000",
    color: "#fff",
    opacity: 0.5,
    margin: "2px",
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
    marginLeft: "20px",
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
    <Container fixed>
      <div className={classes.progressBar}>
        <LinearProgressWithLabel value={progress} />
      </div>
      <Card className={classes.questionCard}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            <ArrowForwardOutlinedIcon fontSize="small"></ArrowForwardOutlinedIcon>
            You're at a coffe shop. The only available seat is in front of a
            stranger
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
          >
            You're at a coffe shop. The only available seat is in front of a
            stranger
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

      <Card className={classes.questionCard}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            <ArrowForwardOutlinedIcon fontSize="small"></ArrowForwardOutlinedIcon>
            You're at a coffe shop. The only available seat is in front of a
            stranger
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
          >
            You're at a coffe shop. The only available seat is in front of a
            stranger
          </Typography>
          <FormControl component="fieldset">
            <TextField
              required
              multiline
              label="Answer"
              variant="outlined"
              style={{ width: 500, marginTop: "10px" }}
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
