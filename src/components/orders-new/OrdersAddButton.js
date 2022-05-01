import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material/';

export default function OrdersAddButton({
  setSelectedOrder,
  setEditMode,
  setOpenEdit,
  customerId,
}) {
  const handleCreateNewOrder = () => {
    setSelectedOrder({
      id: '',
      employeeName: '',
      company: '',
      status: 'new',
      creationDate: '',
      customerId: parseInt(customerId),
      TZ: '',
      img: '',
    });
    setEditMode(false);
    setOpenEdit(true);
  };

  return (
    <div>
      <IconButton
        // color='secondary '
        sx={{ color: '#FFCB05' }}
        aria-label='new order'
        onClick={handleCreateNewOrder}
      >
        <AddCircleIcon fontSize='large' />
      </IconButton>
    </div>
  );
}
