import { createSlice } from '@reduxjs/toolkit';

const initialState = (() => {
  const persistedState = localStorage.getItem('__redux__state__');

  if (persistedState) {
    const store = JSON.parse(persistedState);
    return store;
  }

  return { mostViewMovie: null };
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMostViewMovie(state, action) {
      state.mostViewMovie = action.payload;
    },
  },
});

export const { setMostViewMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
