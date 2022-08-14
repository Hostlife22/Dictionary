import { IUser, Omit } from '..';

export interface ISignInRequest extends Omit<IUser, 'name'> {}
export interface ISignInResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IAuthTokens {
  refreshToken: string;
  token: string;
}
