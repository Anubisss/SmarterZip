import axios from 'axios';

import { State } from '../lib/types';

const BASE_URL = process.env.API_URL;

const LOGIN_REQUIRED = 'LOGIN_REQUIRED';

const isLoginRequired = (state: State | 'LOGIN_REQUIRED'): state is 'LOGIN_REQUIRED' => {
  return state === LOGIN_REQUIRED;
};

const getState = async (uuid: string): Promise<State | 'LOGIN_REQUIRED' | null> => {
  try {
    const res = await axios.get(`${BASE_URL}/devices/states/${uuid}`);
    return res.data;
  } catch (ex) {
    if (axios.isAxiosError(ex) && ex.response) {
      const statusCode = ex.response.status;

      if (statusCode === 401) {
        return LOGIN_REQUIRED;
      }
      return null;
    }
    throw ex;
  }
};

const changeState = async (uuid: string, value: string): Promise<void> => {
  await axios.put(`${BASE_URL}/devices/states/${uuid}`, {
    value,
  });
};

const login = async (email: string, password: string): Promise<void> => {
  await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
};

const selectSystem = async (systemUuid: string): Promise<void> => {
  await axios.get(`${BASE_URL}/systems/select?uuid=${systemUuid}`);
};

export { isLoginRequired, getState, changeState, login, selectSystem };
