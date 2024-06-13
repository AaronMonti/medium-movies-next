import { Metadata } from 'next';
import { Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { Suspense } from 'react';
import MoviesList from '../components/MoviesList';
import { fetchMovies, fetchGenres } from '../services/tmdb';

export const metadata: Metadata = {
  title: 'TMDB Movie Filter',
  description: 'Filter movies by genre using TMDB API',
};

type Props = {
  searchParams: { genre?: string, keyword?: string, page?: string };
};

async function MovieFilterPage({ searchParams }: Props) {
  const genre = searchParams.genre || '';
  const keywordQuery = searchParams.keyword || '';
  const page = parseInt(searchParams.page || '1', 10);

  const movies = await fetchMovies((genre || ''), (keywordQuery || ''), page);
  const genres = await fetchGenres();

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h2">TMDB Movie App</Typography>
          </Link>
        </Grid>
      </Grid>
      <Suspense fallback={<p>Loading...</p>}>
        <MoviesList movies={movies.results} genres={genres} selectedGenre={genre} selectedKeyword={keywordQuery} currentPage={movies.page} totalPages={movies.total_pages} />
      </Suspense>
    </Container>
  );
}

export default MovieFilterPage;
