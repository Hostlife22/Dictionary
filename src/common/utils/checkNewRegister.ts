import { LOCALSTORAGE_KEY_ID } from '../constants/constants';
import { safeParse } from './parseObj';

export const checkNewRegister = () => {
  const userId = safeParse<string>(localStorage.getItem(LOCALSTORAGE_KEY_ID) || 'null');

  if (userId) {
    localStorage.removeItem(LOCALSTORAGE_KEY_ID);
    return userId;
  }

  return null;
};
