'use client';

import {
  Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import Date from './Date';

function MostViewMovie() {
  const mostViewMovie = useSelector((state) => state.movies.movies.mostViewMovie);

  if (!mostViewMovie) {
    return (
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Most Visited Movie:
          </Typography>
          <Typography align="center">No most visited movie found.</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Most Visited Movie:
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 4 }}>
        {mostViewMovie.poster_path && (
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', sm: 300 }, minHeight: { xs: 200, sm: 'auto' } }}
            image={`https://image.tmdb.org/t/p/w300${mostViewMovie.poster_path}`}
            alt={mostViewMovie.title}
          />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent>
            <Typography component="h2" variant="h4" gutterBottom>
              {mostViewMovie.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <Date dateString={mostViewMovie.release_date} />
            </Typography>
            <Typography variant="body1" paragraph>
              {mostViewMovie.overview}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={mostViewMovie.vote_average / 2} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {mostViewMovie.vote_average.toFixed(1)}
                {' '}
                / 10
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Button>
        <Link href="/movies" style={{ textDecoration: 'none' }}>
          View All Movies
        </Link>
      </Button>
    </Container>
  );
}

export default MostViewMovie;
