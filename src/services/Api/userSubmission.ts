import { AxiosResponse } from 'axios';
import { UserSubmission } from '../../interfaces/UserSubmission';

import axios from "../instance";

export const submitAnswer = (data: UserSubmission): Promise<AxiosResponse<void>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        'user-submissions',
        data
      );
      resolve(res.data)
    }
    catch (err) {
      reject(err);
    }
  });
}

export const updateAnswer = (id: string, data: UserSubmission): Promise<AxiosResponse<void>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `user-submissions/${id}`,
        data
      );
      resolve(res.data)
    }
    catch (err) {
      reject(err);
    }
  });
}