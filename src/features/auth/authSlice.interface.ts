import { ISignInResponse, Omit } from '..';

export interface AuthState {
  name: string | null;
  refreshToken: string | null;
  token: string | null;
  userId: string | null;
  newAccount: boolean;
}

export interface IAuthPayload extends Omit<ISignInResponse, 'message'> {}
