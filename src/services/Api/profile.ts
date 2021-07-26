import { AxiosResponse } from 'axios';

import axios from "../instance";
import { SignupRequestInterface } from '../../interfaces/SignupInterface';

export const getUserProfile = (): Promise<SignupRequestInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get('users/me');
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
}

export const updateUserProfile = (data: SignupRequestInterface): Promise<AxiosResponse<void>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(
        'users/me',
        data
      );
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
}
