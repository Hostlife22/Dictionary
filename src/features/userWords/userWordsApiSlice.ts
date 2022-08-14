import { apiSlice } from '../../app/api/apiSlice';
import { API, MethodsEnum } from '../../common';
import {
  ICreateUserWordRequest,
  IUpdateUserWordRequest,
  IUserWordRequest,
  IUserWordResponse,
} from './userWordsApiSlice.interface';

const userWordsApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Words'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserWords: builder.query<IUserWordResponse[], string>({
      query: (id) => API.userWords.getUrl(id),
      providesTags: (result) =>
        result
          ? [
              { type: 'Words', id: 'LIST' },
              ...result.map(({ wordId }) => ({ type: 'Words' as const, id: wordId })),
            ]
          : [{ type: 'Words', id: 'LIST' }],
    }),
    createUserWord: builder.mutation<IUserWordResponse, ICreateUserWordRequest>({
      query: ({ userId, wordId, word }) => ({
        url: API.userWords.getUrl(userId, wordId),
        method: MethodsEnum.POST,
        body: word,
      }),
      invalidatesTags: [{ type: 'Words', id: 'LIST' }],
    }),
    getUserWord: builder.query<IUserWordResponse, IUserWordRequest>({
      query: ({ userId, wordId }) => API.userWords.getUrl(userId, wordId),
      providesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
    updateUserWord: builder.mutation<IUserWordResponse, IUpdateUserWordRequest>({
      query: ({ userId, wordId, word }) => ({
        url: API.userWords.getUrl(userId, wordId),
        method: MethodsEnum.PUT,
        body: word,
      }),
      invalidatesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
    deleteUserWord: builder.mutation<null, IUserWordRequest>({
      query: ({ userId, wordId }) => ({
        url: API.userWords.getUrl(userId, wordId),
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
  }),
});

export const {
  useGetUserWordsQuery,
  useCreateUserWordMutation,
  useGetUserWordQuery,
  useUpdateUserWordMutation,
  useDeleteUserWordMutation,
} = userWordsApiSlice;
