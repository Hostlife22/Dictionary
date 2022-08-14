import { apiSlice } from '../../app/api/apiSlice';
import { API, MethodsEnum } from '../../common';
import { ISignInRequest, ISignInResponse } from './authApiSlice.interface';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body) => ({
        url: API.auth.getUrl(),
        method: MethodsEnum.POST,
        body,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApiSlice;
