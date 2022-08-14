import { apiSlice } from '../../app/api/apiSlice';
import { API } from '../../common';
import {
  ICreateUserRequest,
  ICreateUserResponse,
  IGetUserResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
} from './userApiSlice.interface';

export const userApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (body) => ({
        url: API.user.getUrl(),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: builder.query<IGetUserResponse, string>({
      query: (id) => API.user.getUrl(id),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: API.user.getUrl(id),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<null, string>({
      query: (id) => ({
        url: API.user.getUrl(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
