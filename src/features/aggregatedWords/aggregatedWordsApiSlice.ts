import { apiSlice } from '../../app/api/apiSlice';
import { API, FILTER_PARAMS, WORDS_PER_PAGE_MAX, WORDS_PER_PAGE_MIN } from '../../common';
import {
  IActiveWordsByUser,
  IActiveWordsResponse,
  IAggregatedWordsData,
  IAggregatedWordsRequest,
  IAggregatedWordsResponse,
  ICountWordsByGroup,
} from './aggregatedWordsApiSlice.interface';

const extWordsRes = (response: [IAggregatedWordsData]) => {
  const data = response[0];
  return {
    paginatedResults: data.paginatedResults.map(({ _id, ...word }) => ({
      id: _id,
      ...word,
    })),
    totalCount: data.totalCount.length ? data.totalCount[0].count : 0,
  };
};

export const aggregatedWordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dictionaryWords: builder.query<IAggregatedWordsResponse, IAggregatedWordsRequest>({
      query: ({ userId, group, page, difficulty }) => ({
        url: API.aggregatedWords.getUrl(userId),
        params: {
          group,
          page,
          wordsPerPage: WORDS_PER_PAGE_MAX,
          filter: FILTER_PARAMS.dictionary(difficulty),
        },
      }),
      transformResponse: extWordsRes,
    }),
    countWordsByGroup: builder.query<number, ICountWordsByGroup>({
      query: ({ userId, group }) => ({
        url: API.aggregatedWords.getUrl(userId),
        params: {
          group,
          page: 0,
          wordsPerPage: WORDS_PER_PAGE_MIN,
          filter: FILTER_PARAMS.count,
        },
      }),
      transformResponse: (response: [IAggregatedWordsData]) =>
        response[0]?.totalCount[0]?.count || 0,
    }),
    activeWordsByUser: builder.query<IActiveWordsResponse, IActiveWordsByUser>({
      query: ({ userId, group, page }) => ({
        url: API.aggregatedWords.getUrl(userId),
        params: {
          group,
          page,
          wordsPerPage: WORDS_PER_PAGE_MAX,
          filter: FILTER_PARAMS.active,
        },
      }),
      transformResponse: extWordsRes,
    }),
  }),
});

export const { useDictionaryWordsQuery, useCountWordsByGroupQuery, useActiveWordsByUserQuery } =
  aggregatedWordsApiSlice;
