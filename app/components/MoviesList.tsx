'use client';

import Link from 'next/link';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setGenres } from '@/lib/slices/genreSlice';
import { setMostViewMovie } from '@/lib/slices/moviesSlice';
import Date from './Date';
import PaginationComponent from './Pagination';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};

type MoviesListProps = {
  movies: Movie[];
  genres: Genre[];
  selectedGenre: string;
  selectedKeyword: string;
  currentPage: number;
  totalPages: number;
};

function MoviesList({
  movies, genres, selectedGenre, selectedKeyword, currentPage, totalPages,
} : MoviesListProps) {
  const dispatch = useAppDispatch();
  dispatch(setGenres(genres));
  const storeGenres = useAppSelector((state) => state.genres.genres);

  const mostVisitedMovie = movies.reduce((prev, current) => (prev.vote_average > current.vote_average ? prev : current), movies[0]);
  dispatch(setMostViewMovie(mostVisitedMovie));

  return (
    <div>
      <Box
        component="form"
        method="get"
        action="/movies"
        sx={{
          mb: 4, display: 'flex', gap: 2, alignItems: 'center',
        }}
      >
        <TextField
          name="keyword"
          defaultValue={selectedKeyword}
          placeholder="Buscar por palabra"
          variant="outlined"
        />
        <InputLabel id="select-genre">Géneros</InputLabel>
        <Select
          labelId="select-genre"
          name="genre"
          defaultValue={selectedGenre || ''}
          variant="outlined"
          displayEmpty
        >
          <MenuItem value="">Populares</MenuItem>
          {storeGenres.map((genre : Genre) => (
            <MenuItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </Box>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  height="auto"
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Date dateString={movie.release_date} />
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default MoviesList;
