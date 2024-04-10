import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configuration from '../configuration';
interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
}

interface Configuration {
  images: {
    base_url: string;
  };
}
export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path: string;
}
export interface MovieFilters {
  keywords?: number[];
  genres?: number[];
}
interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}
export interface MoviesQuery {
  page: number;
  filters: MovieFilters;
}
export interface KeywordItem {
  id: number;
  name: string;
}
interface Genre {
  id: number;
  name: string;
}
export interface Filter {
  keywords: KeywordItem[];
  genres: string[];
}
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => '/configuration',
    }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query: (moviesQuery) => {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });
        if (moviesQuery.filters.keywords?.length)
          params.append('with_keywords', moviesQuery.filters.keywords.join('|'));
        if (moviesQuery.filters.genres?.length) params.append('with_genres', moviesQuery.filters.genres.join(','));
        const url = `/discover/movie?${params.toString()}`;
        return url;
      },
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => ({
        results: response.results,
        lastPage: response.page,
        hasMorePages: arg.page < response.total_pages,
      }),
      merge: (currentCacheData, responseData) => {
        if (responseData.lastPage === 1) currentCacheData.results = responseData.results;
        else currentCacheData.results.push(...responseData.results);
        currentCacheData.lastPage = responseData.lastPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch:({currentArg,previousArg})=> currentArg!==previousArg
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (queryText) => `/search/keyword?query=${queryText}`,
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => `/genre/movie/list?language=en`,
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const { useGetConfigurationQuery, useGetGenresQuery, useGetKeywordsQuery, useGetMoviesQuery } = tmdbApi;
