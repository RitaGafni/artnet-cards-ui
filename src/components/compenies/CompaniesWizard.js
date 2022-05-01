import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import { storage } from '../firebase';
// import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
// import {
//   deleteOrder,
//   getURLOfImg,
//   postOrder,
//   updateOrder,
// } from '../controllers/OrdersController';

// import OrdersSubmit from './OrdersWizardSubmit';

export default function CompaniesWizard({
  openWizard,
  setOpenWizard,
  companyToEdit,
  editMode,
}) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const resetValidation = () => {
    console.log('reset validtion');
  };

  const handleClose = () => {
    resetValidation();
    setOpenWizard(false);
  };

  return (
    <div>
      <Dialog open={openWizard} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit company' : 'New company'}</DialogTitle>
        {error && <Alert severity='error'>{error}</Alert>}
        <DialogContent>
          <Box
            id='orders-company-window'
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box id='order-details' sx={{ display: 'flex' }}>
              <Box id='fields' sx={{ display: 'flex', maxWidth: 200 }}>
                rita
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  id='picture'
                  sx={{ display: 'flex', ml: 2, maxWidth: 200, minHeight: 220 }}
                ></Box>
                <Box
                  id='order-add-pic'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <Box id='order-submit-buttons' sx={{ display: 'flex' }}></Box>
      </Dialog>
      {/* {companyToEdit && (
        <Dialog
          open={props.deleteVer}
          onClose={handleClosedeleteVer}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Delete order'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              you are about to Delete {props.orderToDelete.employeeName}, Are
              you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosedeleteVer}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
    </div>
  );
}
