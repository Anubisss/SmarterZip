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

      if (statusCode === 401 || statusCode === 403) {
        return LOGIN_REQUIRED;
      }
      return null;
    }
    throw ex;
  }
};

const changeState = async (uuid: string, value: string): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/devices/states/${uuid}`, {
      value,
    });
  } catch (ex) {
    if (axios.isAxiosError(ex) && ex.response) {
      // eslint-disable-next-line no-console
      console.error(
        `(ERROR)[changeState] can't change state, uuid: ${uuid}, value: ${value}, status: ${ex.response.status}`
      );
      return;
    }
    throw ex;
  }
};

const login = async (email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
  } catch (ex) {
    if (axios.isAxiosError(ex) && ex.response) {
      // eslint-disable-next-line no-console
      console.error(`(ERROR)[login] can't login, status: ${ex.response.status}`);
      return;
    }
    throw ex;
  }
};

const selectSystem = async (systemUuid: string): Promise<void> => {
  try {
    await axios.get(`${BASE_URL}/systems/select?uuid=${systemUuid}`);
  } catch (ex) {
    if (axios.isAxiosError(ex) && ex.response) {
      // eslint-disable-next-line no-console
      console.error(`(ERROR)[selectSystem] can't select system, status: ${ex.response.status}`);
      return;
    }
    throw ex;
  }
};

export { isLoginRequired, getState, changeState, login, selectSystem };
