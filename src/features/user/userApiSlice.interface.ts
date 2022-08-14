export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserData extends Omit<IUser, 'password'> {}
export interface IGetUserResponse extends IUserData {}

export interface ICreateUserRequest extends IUser {}
export interface ICreateUserResponse extends IUserData {
  id: string;
}

export interface IUpdateUserResponse extends IUserData {}
export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  id: string;
}
