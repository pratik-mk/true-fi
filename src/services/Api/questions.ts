import { QuestionsResponseInterface } from '../../interfaces/QuestionsInterface';

import axios from "../instance";

export const getQuestions = () : Promise<QuestionsResponseInterface[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get('questions');
      resolve(res.data);
    }
    catch(err) {
      reject(err);
    }
  });
}