import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  LinearProgressProps,
  LinearProgress,
  Box,
} from "@material-ui/core";
// import { getQuestions } from '../../services/Api/questions';
import { QuestionsResponseInterface } from '../../interfaces/QuestionsInterface';
import QuestionCard from '../../components/QuestionCard';
import { OptionInterface } from '../../interfaces/OptionInterface';
import { checkIfDataPresent } from '../../utils';
import { LATEST_QUESTION_ID } from '../../constants/text';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../utils/localstorage';

type QuestionProps = {

}

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
    margin: "50px",
  },
  body: {
    // backgroundColor: '#7cc6fe',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '30vh',
  },
});

const Question: React.FC<QuestionProps> = (props): JSX.Element => {
  const classes = useStyles();
  // const [allQuestions, setAllQuestions] = useState([] as unknown as QuestionsResponseInterface[])
  const [currentQuestion, setCurrentQuestion] = useState({
    _id: '',
    question: '',
    questionNote: '',
    isOptionBasedQuestion: true,
    responseOptions: [] as unknown as OptionInterface[]
  })
  const [latestQuestionID, setlatestQuestionID] = useState('')
  // const [progress, setProgress] = React.useState(10);

  const mockData =
    [
      {
        "_id": "60e438dd7dc77d3861c477ef",
        "responseOptions": [
          {
            "option": "Yes",
            "value": 1,
            "children": [
              "abc",
            ]
          },
          {
            "option": "No",
            "value": 0,
            "children": [
              "yahoo",
            ]
          },
          {
            "option": "Maybe",
            "value": 2,
            "children": []
          }
        ],
        "question": "Sed in massa mattis, ornare lacus eu, volutpat odio. Curabitur pellentesque pretium vulputate.?",
        "questionNote": "Donec interdum, nunc et dignissim sodales",
        "isLive": true,
        "parentQuestion": "60e4390d7dc77d3861c477f0",
        "parentQuestionOption": "No",
        "isOptionBasedQuestion": true,
        "weight": {
          "_id": "60e40d9b1663465e68f320e0",
          "name": "Important",
          "value": 45
        },
        "category": {
          "_id": "60e3057f4408504eead0e0f4",
          "name": "Borrower"
        },
        "respondent": {
          "_id": "60e40dbb1663465e68f320e1",
          "name": "Borrower"
        }
      },
      {
        "_id": "60e4390d7dc77d3861c477f0",
        "responseOptions": [
          {
            "option": "Yes",
            "value": 1,
            "children": [
              "60e4390d7dc77d3861c477f4"
            ]
          },
          {
            "option": "No",
            "value": 0,
            "children": [
              "60e4390d7dc77d3861c477f4"
            ]
          }
        ],
        "question": "TrueFi Repayment History?",
        "questionNote": "Does the Borrower have repayment history with TrueFi?",
        "isLive": true,
        "parentQuestion": null,
        "parentQuestionOption": null,
        "isOptionBasedQuestion": true,
        "weight": {
          "_id": "60e40d9b1663465e68f320e0",
          "name": "Important",
          "value": 45
        },
        "category": {
          "_id": "60e3057f4408504eead0e0f4",
          "name": "Borrower"
        },
        "respondent": {
          "_id": "60e40dbb1663465e68f320e1",
          "name": "Borrower"
        }
      },
      {
        "_id": "60e4390d7dc77d3861c477f4",
        "responseOptions": null,
        "question": "Portfolio Asset Allocation?",
        "questionNote": "What type of assets does the Borrower invest in?",
        "isLive": true,
        "parentQuestion": null,
        "parentQuestionOption": null,
        "isOptionBasedQuestion": false,
        "weight": {
          "_id": "60e40d9b1663465e68f320e0",
          "name": "Important",
          "value": 45
        },
        "category": {
          "_id": "60e3057f4408504eead0e0f4",
          "name": "Borrower"
        },
        "respondent": {
          "_id": "60e40dbb1663465e68f320e1",
          "name": "Borrower"
        }
      }
    ] as unknown as QuestionsResponseInterface[]

  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      try {
        // const allQuestions = await getQuestions()
        // setAllQuestions([...allQuestions])
        if (!checkIfDataPresent(LATEST_QUESTION_ID)) {
          setItemInLocalStorage(LATEST_QUESTION_ID, "60e4390d7dc77d3861c477f0")
        }
        setlatestQuestionID(getItemFromLocalStorage(LATEST_QUESTION_ID))
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchQuestions();
  }, [])

  useEffect(() => {
    if (latestQuestionID) {
      const latestQuestion = mockData.filter(singleQuestion => singleQuestion._id === latestQuestionID)[0]
      setCurrentQuestion({
        _id: latestQuestion._id,
        question: latestQuestion.question,
        questionNote: latestQuestion.questionNote,
        isOptionBasedQuestion: latestQuestion.isOptionBasedQuestion,
        responseOptions: latestQuestion.responseOptions
      })
    }
    // eslint-disable-next-line
  }, [latestQuestionID])

  const handleNext = (answer: string) => {
    if (currentQuestion.isOptionBasedQuestion) {
      const childrenNodes = currentQuestion.responseOptions.filter(option => option.option === answer)[0].children
      setItemInLocalStorage(LATEST_QUESTION_ID, childrenNodes[0])
      setlatestQuestionID(childrenNodes[0])
    } else {
      console.log(answer)
    }
  }

  return (
    <Container>
      <br />
      <div className={classes.progressBar}>
        <LinearProgressWithLabel value={10} />
      </div>
      <div className={classes.body}>
        <QuestionCard question={currentQuestion} handleNext={handleNext} />
      </div>
    </Container>
  );
}

export default Question


