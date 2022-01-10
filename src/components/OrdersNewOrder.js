import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import OrdersWizard from './OrdersWizard';

export default function OrdersNewOrder(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Fab
        size='small'
        color='primary'
        aria-label='add'
        onClick={() => setOpen(true)}
      >
        <AddIcon fontSize='small' />
      </Fab>
      {open && (
        <OrdersWizard new={true} open={open} setOpen={() => setOpen()} />
      )}
    </div>
  );
}
