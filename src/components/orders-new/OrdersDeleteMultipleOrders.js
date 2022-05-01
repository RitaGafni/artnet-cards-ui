import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteMultipleOrders({
  numberOfOrdersToDelete,
  openDeleteDialog,
  handleClickOpenDeleteDialog,
  handleCloseDeleteDialog,
}) {
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-delete-multiple-orders'>
          Are you sure you want to delete {numberOfOrdersToDelete} orders?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button onClick={handleCloseDeleteDialog} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
