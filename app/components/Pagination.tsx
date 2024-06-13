'use client';

import React from 'react';
import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function PaginationComponent({ currentPage, totalPages }: PaginationProps) {
  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    window.location.search = params.toString();
  };

  return (
    <Stack spacing={2} alignItems="center" margin={2}>
      <Pagination count={totalPages} page={currentPage} onChange={changePage} />
    </Stack>
  );
}

export default PaginationComponent;
