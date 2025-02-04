import { createSlice } from "@reduxjs/toolkit";
import { TMovie } from "../../utils/type";
import { getMovieApi } from "../../utils/api";

type MoviesState = {
  movies: TMovie[];
  loading: boolean;
}

export const initialState: MoviesState = {
  movies: [],
  loading: false,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState ,
  reducers: {},
  selectors: {
    getMovieState: (state) => state.movies,
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(getMovieApi.endpoints.getListMovies.matchFulfilled, (state, action) => {
      state.movies = action.payload.Search;
    })
  },
});

export const {getMovieState} = moviesSlice.selectors;
export const moviesReducer = moviesSlice.reducer;