import React from 'react';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

export default function TemplateHeading() {
  const handleAddCTemplate = () => {
    console.log('new template');
  };
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title='Add new fiels' placement='left' arrow>
          <IconButton
            size='large'
            color='primary'
            aria-label='add new tremplate'
            component='span'
            onClick={handleAddCTemplate}
          >
            <AddCircleTwoToneIcon fontSize='large' />
          </IconButton>
        </Tooltip>
        <TextField
          sx={{ width: '100%', mb: '12px' }}
          required
          id='template_name'
          name='template_name'
          label='Template Name'
          fullWidth
          variant='standard'
          //   value={customer.customer_name}
          //   onChange={editCustomerName}
          //   error={customerNameValidation !== ''}
          //   helperText={customerNameValidation}
        />
      </Box>
    </div>
  );
}
