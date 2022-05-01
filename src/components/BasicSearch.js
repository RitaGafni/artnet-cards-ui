import React from 'react';
import { TextField } from '@mui/material';

export default function BasicSearch({ searchQ, setSearchQ, category }) {
  return (
    <div className='basic-search'>
      <TextField
        fullWidth
        size='small'
        id='basic search'
        label={`Search ${category}`}
        variant='outlined'
        margin='normal'
        value={searchQ}
        onChange={(e) => setSearchQ(e.target.value)}
      />
    </div>
  );
}
