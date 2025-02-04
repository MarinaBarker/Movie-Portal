import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {moviesReducer} from '../services/slices/movieSlice';
import { userReducer } from '../services/slices/userSlice';
import { getMovieApi } from "../utils/api";


export const rootReducer = combineReducers({
    movies: moviesReducer,
    user: userReducer,
    [getMovieApi.reducerPath]: getMovieApi.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      getMovieApi.middleware,
    ),
    
    devTools: process.env.NODE_ENV !== 'production'
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;