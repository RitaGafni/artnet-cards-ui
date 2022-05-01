import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogTitle, Box } from '@mui/material/';
import TemplateItem from './TemplateItem';

export default function Template() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const name = 'Customer';

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`${name} template`}</DialogTitle>
        <Box sx={{ diplay: 'flex', flexWrap: 'wrap' }}>
          <TemplateItem />
          <TemplateItem />
          <TemplateItem />
          <TemplateItem />
          <TemplateItem />
        </Box>
        <DialogActions>
          <Button disabled={isLoading} onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => console.log('Save Changes')}
            autoFocus
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
