import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReactPaginate from 'react-paginate';
import { getQuestions } from '../../services/Api/questions';
import { QuestionsResponseInterface } from '../../interfaces/QuestionsInterface';
import { OptionInterface } from '../../interfaces/OptionInterface';
import QuestionCard from '../../components/QuestionCard';

type QuestionProps = {

}

const Question: React.FC<QuestionProps> = (props): JSX.Element => {
  const [offset, setOffset] = useState(0)
  const [perPage, setPerPage] = useState(1)
  const [question, setQuestion] = useState([] as unknown as QuestionsResponseInterface[])
  const [questionCount, setQuestionCount] = useState(1)

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
        "question": "Who is prime minister of india?",
        "questionNote": "Name the prime minister",
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
            "children": []
          },
          {
            "option": "No",
            "value": 0,
            "children": [
              "60e438dd7dc77d3861c477ef"
            ]
          }
        ],
        "question": "aadfafgafare dfafe adfafjlekpaaifadf kadfaadadfk aqerqerkqawererk aadpiererlker adafd ",
        "questionNote": "oerlkwrw;palkdlka [owrek. lwerhslke werlkwerodsk ",
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
      }
    ] as unknown as QuestionsResponseInterface[]

  useEffect(() => {
    fetchQuestions();
  }, [])

  const fetchQuestions = async (): Promise<void> => {
    try {
      const allQuestions = await getQuestions()
      const slice = mockData.slice(offset, offset + perPage)
      const listOfQuestions = slice.map(question => question)
      setQuestion([...listOfQuestions]);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleNext = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setQuestionCount(prevQuestionCount => prevQuestionCount + 1)
    const offsetCount = questionCount * perPage;
    setOffset(offsetCount)
    fetchQuestions();
  }

  return (
    <Container>
      <div>
        <Typography variant='h5'>Questions</Typography>
      </div>
      <div>
        {question.map((singleQuestion, index: number) => {
          return (
            <QuestionCard question={singleQuestion} handleNext={handleNext} />
          );
        })}
      </div>
    </Container>
  );
}

export default Question


