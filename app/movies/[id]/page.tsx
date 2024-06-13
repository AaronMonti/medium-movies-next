import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Button, Card, CardContent, CardMedia, Chip, Container, Rating, Typography,
} from '@mui/material';
import Date from '@/app/components/Date';
import SimilarMovies from '../../components/SimilarMovies';
import { fetchGenres, fetchMovieDetail, fetchSimilarMovies } from '../../services/tmdb';

type Genre = {
  id: number;
  name: string;
};

async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  if (!id) {
    redirect('/');
  }
  const movieDetails = await fetchMovieDetail(Number(id));
  const similarMovies = await fetchSimilarMovies(Number(id));
  const allGenres = await fetchGenres();

  const movieGenres = movieDetails.genres.map((genre : Genre) => {
    const foundGenre = allGenres.find((g : Genre) => g.id === genre.id);
    return foundGenre ? foundGenre.name : 'Unknown';
  });

  return (
    <Container key={movieDetails.id} style={{ marginTop: 20 }}>
      <Link href="/movies">
        <Button variant="contained" sx={{ mb: 2 }}>
          Regresar
        </Button>
      </Link>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 4 }}>
        {movieDetails.poster_path && (
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: 300 }, minHeight: { xs: 200, sm: 'auto' } }}
          image={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent>
            <Typography component="h2" variant="h4" gutterBottom>
              {movieDetails.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <Date dateString={movieDetails.release_date} />
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              {movieGenres.map((genre : string) => (
                <Chip key={genre} label={genre} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <Typography variant="body1" paragraph>
              {movieDetails.overview}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={movieDetails.vote_average / 2} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {movieDetails.vote_average.toFixed(1)}
                {' '}
                / 10
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <SimilarMovies similarMovies={similarMovies} />
    </Container>
  );
}

export default MovieDetail;
