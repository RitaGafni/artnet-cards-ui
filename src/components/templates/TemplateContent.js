import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, TextField, Tooltip, IconButton } from '@mui/material';

export default function TemplateContent() {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          sx={{ width: '100%', mr: '2rem' }}
          required
          id='field_name'
          name='field_name'
          label='Field Name'
          fullWidth
          variant='standard'
          //   value={customer.customer_name}
          //   onChange={editCustomerName}
          //   error={customerNameValidation !== ''}
          //   helperText={customerNameValidation}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id='template_type'
          name='template_type'
          label='Template Type'
          fullWidth
          variant='standard'
          //   value={customer.customer_name}
          //   onChange={editCustomerName}
          //   error={customerNameValidation !== ''}
          //   helperText={customerNameValidation}
        />
        <Tooltip title='Delete field' placement='right' arrow>
          <IconButton
            color='warning'
            aria-label='add new tremplate'
            component='span'
            onClick={() => console.log('delete field')}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}
