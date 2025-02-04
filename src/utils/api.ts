import { TMovieData, TMovieSearchResponse, TMoviesListData } from "./type";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TMovieSearchRequest = {
  searchParam: string;
  page?: string | number;
  type?: string;
}

export type TGetMovieByIdRequest = {
  movieId: string;
}

const apiKey = 'f56f2021';

export const getMovieApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getListMovies: builder.query<TMovieSearchResponse, TMovieSearchRequest>({
      query: ({ searchParam, page, type }) => ({
        url: `/?apikey=${apiKey}&s=${searchParam ? searchParam : 'baby'}&page=${page}&type=${type}`,
      }),
    }),
    getMovieById: builder.query<TMovieData, TGetMovieByIdRequest>({
      query: ({ movieId }) => ({
        url: `/?apikey=${apiKey}&i=${movieId}`,
      }),
    }),
    getFavoritesById: builder.query<TMoviesListData[], { ids: string[] }>({
      queryFn: async ({ ids }, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const requests = ids.map((id) => fetchWithBQ(`/?apikey=${apiKey}&i=${id}`));
          const responses = await Promise.all(requests);

          const data = responses.map((response) => {
            if ('error' in response) {
              throw new Error('One or more requests failed');
            }
            return response.data as TMoviesListData;
          });
          return { data };
        }catch(err: any) {
          return { error: err.message }
        }
      },
    }),
  })
})
   
export const { useGetListMoviesQuery, useGetMovieByIdQuery, useGetFavoritesByIdQuery } = getMovieApi;
export const { endpoints: {getListMovies, getMovieById, getFavoritesById }} = getMovieApi;