import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { QuestionsResponseInterface } from "../interfaces/QuestionsInterface";

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

type QuestionCardProps = {
  question: QuestionsResponseInterface;
  handleNext: (event: React.SyntheticEvent<Element, Event>) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  handleNext
}): JSX.Element => {
  const classes = useStyles();

  return (
    //style={{backgroundColor: '#e8efff'}}
    <Container fixed>
      <Card className={classes.questionCard}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            <ArrowForwardOutlinedIcon fontSize="small" />
            {question.question}
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
          >
            {question.questionNote}
          </Typography>
          <FormControl component="fieldset">
            {
              question.isOptionBasedQuestion &&
              <RadioGroup aria-label="question" name="question">
                {
                  question.responseOptions.map(option =>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio color="primary" />}
                      label={option.option}
                    />)
                }
              </RadioGroup>
            }
            {
              !question.isOptionBasedQuestion &&
              <TextField
                required
                multiline
                label="Answer"
                variant="outlined"
                style={{ width: 500, marginTop: "10px" }}
              />
            }
          </FormControl>
        </CardContent>
        <Button
          color="primary"
          size="small"
          style={{ float: "right", margin: "5px" }}
        >
          <ArrowForwardIosIcon onClick={handleNext} />
        </Button>
      </Card>
      {/* <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ margin: "25px" }}
      >
        Submit
      </Button> */}
    </Container>
  );
}

export default QuestionCard