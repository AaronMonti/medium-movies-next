import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './slices/genreSlice';
import moviesReducer from './slices/moviesSlice';
import persistanceMiddleware from './middlewares/persistanceMiddleware';

export const makeStore = () => configureStore({
  reducer: {
    genres: genresReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) => [persistanceMiddleware],
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
