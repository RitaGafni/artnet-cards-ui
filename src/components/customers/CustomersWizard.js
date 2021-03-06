import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, DialogContentText, Alert } from '@mui/material/';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Image from 'mui-image';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import defaultImage from '../../images/defaultImg.jpg';
import {
  deleteCustomer,
  getURLOfLogo,
  PostNewCustomer,
  updateCustomer,
} from '../../controllers/CustomerController';
import BadgeIcon from '@mui/icons-material/Badge';
import Tooltip from '@mui/material/Tooltip';

const Input = styled('input')({
  display: 'none',
});

export default function CustomerWizard(props) {
  const [deleteVer, setDeleteVer] = useState(false);
  const [customerNameValidation, setCustomerNameValidation] = useState('');
  const [newLogo, setNewLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(defaultImage);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [customer, setCustomer] = useState({
    id: '',
    customer_name: '',
    customerId: '',
    logo: '',
    new_orders: '',
  });

  useEffect(() => {
    if (props.selectedCustomer) {
      setCustomer({
        id: props.selectedCustomer.id,
        customerId: props.selectedCustomer.customerId,
        customer_name: props.selectedCustomer.customer_name,
        logo: props.selectedCustomer.logo,
        new_orders: props.selectedCustomer.new_orders,
      });
      setPreviewLogo(props.selectedCustomer.logo);
    } else {
      setPreviewLogo(defaultImage);
    }
  }, [props.editMode, props.selectedCustomer, props.setOpenEdit]);

  async function createNewCustomer() {
    setError('');
    try {
      setIsLoading(true);
      const newURL = await getURLOfLogo(newLogo, customer.customer_name);
      await PostNewCustomer(customer.customer_name, newURL);
      props.setOpenEdit(false);
      setPreviewLogo(defaultImage);
      setNewLogo(null);
      setIsLoading(false);
      props.setIsCustumersUpdatd(true);
    } catch (error) {
      setIsLoading(false);
      setError(`couldn't create new customer`);
      console.log(error);
    }
  }

  async function editCustomer() {
    setError('');
    try {
      setIsLoading(true);
      let logoURLToUpload = customer.logo;
      if (newLogo) {
        logoURLToUpload = await getURLOfLogo(newLogo, customer.customer_name);
        setNewLogo(null);
      }
      await updateCustomer(customer, logoURLToUpload);
      props.setOpenEdit(false);
      setIsLoading(false);
      props.setIsCustumersUpdatd(true);
    } catch (error) {
      setIsLoading(false);

      setError(`couldn't update customer`);
      console.log(error);
    }
  }

  async function handleDeleteCustomer() {
    setError('');
    try {
      setIsLoading(true);
      await deleteCustomer(customer.id);
      setDeleteVer(false);
      props.setOpenEdit(false);
      setIsLoading(false);
      props.setIsCustumersUpdatd(true);
      props.setIsCustumersUpdatd(true);
    } catch (error) {
      setIsLoading(false);
      setError('couldnt delete customer');
      console.log(error);
    }
  }

  async function handleSaveChanges() {
    setError('');
    if (
      props.editMode &&
      props.selectedCustomer.customer_name === customer.customer_name &&
      !newLogo
    ) {
      props.setOpenEdit(false);

      return;
    }

    if (customer.customer_name === '') {
      setCustomerNameValidation('Name Cannot be blank');
      return;
    }

    if (props.editMode) {
      editCustomer();
    } else {
      createNewCustomer();
    }
  }

  const handleCloseCustomersWizard = () => {
    props.setOpenEdit(false);
    setCustomerNameValidation('');
    setPreviewLogo(defaultImage);
  };

  const handleCloseDeleteVerification = async () => {
    await setDeleteVer(false);
  };

  function editCustomerName(e) {
    setCustomerNameValidation('');
    setCustomer((prevCustomers) => {
      return { ...prevCustomers, [e.target.name]: e.target.value };
    });
  }

  function handleDeleteVerification() {
    setDeleteVer(true);
  }

  function handleLogoChange(e) {
    if (e.target.files[0]) {
      setPreviewLogo(URL.createObjectURL(e.target.files[0]));
      setNewLogo(e.target.files[0]);
    }
  }

  return (
    <div>
      <div>
        {props.selectedCustomer && (
          <Dialog open={props.openEdit} onClose={handleCloseCustomersWizard}>
            <DialogTitle>
              {props.editMode
                ? `Edit Customer ${props.selectedCustomer.customer_name}`
                : 'Create New Customer'}
            </DialogTitle>
            {error && <Alert severity='error'>{error}</Alert>}
            <DialogContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <TextField
                  required
                  id='customer_name'
                  name='customer_name'
                  label='Customer Name'
                  fullWidth
                  autoComplete='given-name'
                  variant='standard'
                  value={customer.customer_name}
                  onChange={editCustomerName}
                  error={customerNameValidation !== ''}
                  helperText={customerNameValidation}
                />

                <FormControl fullWidth></FormControl>

                <Box component='span' sx={{ height: 220, p: 3 }}>
                  <Image
                    src={previewLogo}
                    height='100%'
                    width='100%'
                    duration={0}
                    fit='contain'
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <label htmlFor='icon-button-file'>
                    <Input
                      accept='image/*'
                      id='icon-button-file'
                      type='file'
                      onChange={handleLogoChange}
                    />
                    <Tooltip title='Upload logo' placement='top' arrow>
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='span'
                        disabled={isLoading}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </Tooltip>
                  </label>
                  <Tooltip title='Template' placement='top' arrow>
                    <IconButton
                      color='primary'
                      aria-label='customer template'
                      component='span'
                      onClick={() => console.log('template')}
                    >
                      <BadgeIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              {props.editMode && (
                <Button disabled={isLoading} onClick={handleDeleteVerification}>
                  Delete
                </Button>
              )}
              <Button disabled={isLoading} onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button disabled={isLoading} onClick={handleCloseCustomersWizard}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <div>
        {props.selectedCustomer && (
          <Dialog
            open={deleteVer}
            onClose={handleCloseDeleteVerification}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Delete customer'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                you are about to Delete {props.selectedCustomer.customer_name},
                Are you sure?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                disabled={isLoading}
                onClick={handleCloseDeleteVerification}
              >
                No
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleDeleteCustomer}
                autoFocus
              >
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}
