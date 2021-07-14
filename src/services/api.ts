import { AxiosResponse } from 'axios';

import axios from "./instance";
import { LoginRequestInterface} from '../interfaces/LoginRequestInterface';
import { LoginResponseInterface } from '../interfaces/LoginResponseInterface';

export const signup = (data: LoginRequestInterface): Promise<LoginResponseInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(
                'auth/signup',
                data
            );
            resolve(res.data);
        }
        catch(err) {
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
        catch(err) {
            reject(err);
        }
    });
};

export const logout = (): Promise<AxiosResponse<void>> => {
    return axios.get(`auth/logout`);
};
