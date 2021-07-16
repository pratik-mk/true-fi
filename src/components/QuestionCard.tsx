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
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { QuestionsResponseInterface } from "../interfaces/QuestionsInterface";

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
      <Card className={classes.questionCard} style={{ marginTop: "50px" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="left"
            style={{ margin: "5px" }}
          >
            {question.question}
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="left"
            style={{ marginLeft: "20px" }}
          >
            {question.questionNote}
          </Typography>
          <FormControl component="fieldset">
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
          </FormControl>
        </CardContent>
        <Button
          color="primary"
          size="small"
          style={{ float: "right", margin: "5px" }}
        >
          <ArrowForwardIosIcon onClick={handleNext}></ArrowForwardIosIcon>
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