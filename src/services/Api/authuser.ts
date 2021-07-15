import { AxiosResponse } from 'axios';

import axios from "../instance";
import { LoginRequestInterface, LoginResponseInterface } from '../../interfaces/LoginInterface';
import { SignupRequestInterface } from '../../interfaces/SignupInterface';

export const signup = (data: SignupRequestInterface): Promise<AxiosResponse<void>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        'users',
        data
      );
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
};

export const login = (data: LoginRequestInterface): Promise<LoginResponseInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        'auth/login',
        data
      );
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
};

export const logout = (): Promise<AxiosResponse<void>> => {
  return axios.get(`auth/logout`);
};
