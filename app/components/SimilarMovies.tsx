import React from 'react';
import {
  Card, CardContent, CardMedia, Typography, Box, Grid,
} from '@mui/material';
import Link from 'next/link';

function SimilarMovies({ similarMovies }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Películas Similares
      </Typography>
      <Grid container spacing={2}>
        {similarMovies.results.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Link href="#" passHref style={{ textDecoration: 'none' }}>
              <Card>
                {movie.poster_path && (
                  <CardMedia
                    component="img"
                    sx={{ height: 300 }}
                    image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <CardContent>
                  <Typography component="h2" variant="h6">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SimilarMovies;
