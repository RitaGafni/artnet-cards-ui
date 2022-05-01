import { Container, TextField } from '@mui/material';
import React from 'react';

export default function CustomersSearchBar(props) {
  return (
    <div>
      <Container sx={{ textAlign: 'left' }}>
        <TextField
          id='search customers'
          label='Search Customers'
          variant='outlined'
          margin='normal'
          onChange={(e) => props.setSearchQ(e.target.value)}
        />
      </Container>
    </div>
  );
}
