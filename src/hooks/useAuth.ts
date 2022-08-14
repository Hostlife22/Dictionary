import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app';
import { LOCALSTORAGE_KEY_USER, safeParse } from '../common';
import { IAuthPayload } from '../features';
import { selectAuth, setUser } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = safeParse<IAuthPayload>(localStorage.getItem(LOCALSTORAGE_KEY_USER) || 'null');
  const { newAccount, ...userSelected } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && userSelected.token === null) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return { auth: !!user || !!userSelected.token, user: user || userSelected };
};
