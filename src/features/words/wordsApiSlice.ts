import { apiSlice } from '../../app/api/apiSlice';
import { API } from '../../common';
import { IWordsRequest, IWordsResponse } from './wordsApiSlice.interface';

export const wordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query<IWordsResponse[], IWordsRequest>({
      query: ({ page, group }) => API.words.getUrl('', { page, group }),
    }),
    getWord: builder.query<IWordsResponse, string>({
      query: (id) => API.words.getUrl(id),
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = wordsApiSlice;
