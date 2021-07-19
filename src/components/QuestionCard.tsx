import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { submitAnswer, updateAnswer } from "../services/Api/userSubmission";
import { OptionInterface } from "../interfaces/OptionInterface";

const useStyles = makeStyles({
  questionSection: {
    width: '100%',
    position: 'relative',
  },
  questionText: {
    marginBottom: '20px'
  },
  questionNote: {
    marginBottom: '10px',
    fontSize: '14px',
  },
  answerSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '30px'
  },
  questionCount: {
    marginBottom: '20px',
  },
  questionCountSpan: {
    fontSize: '26px',
  },
  progressBar: {
    width: "100%",
    margin: "20px",
  },
  app: {
    // backgroundColor: '#252d4a',
    width: '650px',
    minHeight: 'min-content',
    // height: 'min-content',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '10px 10px 30px -5px rgba(0, 0, 0, 0.75)',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    fontSize: '18px',
    color: '#ffffff',
    backgroundColor: '#3f51b5',
    borderRadius: '15px',
    display: 'flex',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid #ffffff',
    cursor: 'pointer',
    alignSelf: 'center',

    '&:hover': {
      backgroundColor: '#555e7d',
    },
    '&:focus': {
      backgroundColor: 'rgb(0 0 0 / 38%)',
      outline: 'none'
    },
    // '&:active': {
    //   backgroundColor: '#555e7d',
    // }

  },
});

type QuestionCardProps = {
  question: {
    _id: string,
    question: string,
    questionNote: string,
    isOptionBasedQuestion: boolean,
    responseOptions: OptionInterface[]
  };
  handleNext: (answer: string) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  handleNext
}): JSX.Element => {
  const classes = useStyles();
  const [answer, setAnswer] = useState('')
  const [textAnswer, setTextAnswer] = useState('')
  const [formError, setFormError] = useState('')

  const handleAnswer = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setFormError('');
    const answerObj = {
      _id: question._id,
      answer: event.target.value
    }
    setAnswer(event.target.value);
    try {
      if (answer) {
        await updateAnswer("user_id", answerObj)
      } else {
        await submitAnswer(answerObj)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleClick = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    if (answer || textAnswer) {
      if (!question.isOptionBasedQuestion) {
        const answerObj = {
          _id: question._id,
          answer: textAnswer
        }
        await submitAnswer(answerObj)
        handleNext(textAnswer)
      } else {
        handleNext(answer)
      }
      setAnswer('')
      setTextAnswer('')
    }
    else {
      setFormError("Please enter your answer.")
    }
  }

  return (
    <div>
      <div className={classes.app}>
        <div className={classes.questionSection}>
          <div className={classes.questionCount}>
            <span className={classes.questionCountSpan}>Question 1</span>
          </div>
          <div className={classes.questionText}>{question.question}</div>
          <div className={classes.questionNote}>{question.questionNote}</div>
          <FormHelperText component="p" error={true}>
            <span style={{ display: 'flex', justifyContent: 'center' }}>{formError}</span>
          </FormHelperText>
          <div className={classes.answerSection}>
            {
              question.isOptionBasedQuestion &&
              question.responseOptions.map((option, index: number) => {
                let checkedInput = false
                if (answer === option.option) {
                  checkedInput = true
                }
                return <input
                  className={classes.button}
                  type="button"
                  key={index}
                  value={option.option}
                  onClick={handleAnswer}
                />
              })
            }
            {
              !question.isOptionBasedQuestion &&
              <TextField
                required
                value={textAnswer}
                label="Answer"
                variant="outlined"
                style={{ width: 400, alignSelf: 'center' }}
                onChange={(e) => {
                  setFormError('')
                  setTextAnswer(e.target.value)
                }}
              />
            }
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ margin: "25px" }}
        onClick={handleClick}
      >
        Submit
      </Button>
    </div>
  );
}

export default QuestionCard
