import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default function CustomersSearchBar() {
  return (
    <div>
      <InputGroup className='mb-3 mt-3'>
        <InputGroup.Text>Search Customer </InputGroup.Text>
        <FormControl aria-label='Search' placeholder='Type here' />
      </InputGroup>
    </div>
  );
}
