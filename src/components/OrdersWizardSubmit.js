import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function OrdersSubmit(props) {
  return (
    <div>
      <DialogActions>
        <Button onClick={props.handleSaveChanges}>Save</Button>
        <Button onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </div>
  );
}
