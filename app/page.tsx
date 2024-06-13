// pages/ssrPage.js

import React from 'react';
import { Grid, Typography } from '@mui/material';
import MostViewMovie from './components/MostViewMovie';

const page = () => (
  <Grid container spacing={3} justifyContent="center">
    <Grid item xs={12}>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to My Movie App
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <MostViewMovie />
    </Grid>
    <Grid item xs={12} />
  </Grid>
);

export default page;
