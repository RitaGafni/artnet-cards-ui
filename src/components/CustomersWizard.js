import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, DialogContentText, Stack, Alert } from '@mui/material/';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Image from 'mui-image';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import defaultImage from '../images/defaultImg.jpg';

const Input = styled('input')({
  display: 'none',
});

export default function CustomerWizard(props) {
  const [deleteVer, setDeleteVer] = useState(false);
  const [nameVerError, setNameVerError] = useState('');
  const [newLogo, setNewLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(defaultImage);
  const [error, setError] = useState('');

  const [customer, setCustomer] = useState({
    id: '',
    customer_name: '',
    logo: '',
    new_orders: '',
  });

  useEffect(() => {
    if (props.selectedCustomer) {
      setCustomer({
        id: props.selectedCustomer.id,
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
    const uploadRef = ref(storage, `${customer.customer_name}.png`);
    try {
      const snapshot = await uploadBytes(uploadRef, newLogo);
      const newURL = await getDownloadURL(uploadRef);
      const res = await axios.post('http://localhost:5000/customers/', {
        id: '',
        customer_name: customer.customer_name,
        logo: newURL,
        new_orders: 0,
      });
      console.log(res);
      props.setOpenEdit(false);
      setPreviewLogo(defaultImage);
      setNewLogo(null);
      console.log('reload window!');
      // window.location.reload(false);
    } catch (err) {
      setError(`couldn't create new customer`);
      console.log(err);
    }
  }

  async function editCustomer() {
    var URL = customer.logo;
    setError('');
    try {
      if (newLogo) {
        const uploadRef = ref(storage, `${customer.customer_name}.png`);
        const snapshot = await uploadBytes(uploadRef, newLogo);
        URL = await getDownloadURL(uploadRef);
        setNewLogo(null);
      }

      const res = await axios.put(
        `http://localhost:5000/customers/${customer.id}`,
        {
          id: customer.id,
          customer_name: customer.customer_name,
          logo: URL,
          new_orders: 0,
        }
      );
      console.log(res);
      props.setOpenEdit(false);
      window.location.reload(false);
    } catch (error) {
      setError(`couldn't update customer`);
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
      setNameVerError('Name Cannot be blank');
      return;
    }
    if (props.editMode) {
      editCustomer();
    } else {
      createNewCustomer();
    }
  }

  const handleClose = () => {
    props.setOpenEdit(false);
    setNameVerError('');
    setPreviewLogo(defaultImage);
  };

  const handleClosedeleteVer = async () => {
    await setDeleteVer(false);
  };

  function editCustomerName(e) {
    setNameVerError('');
    setCustomer((prevCustomers) => {
      return { ...prevCustomers, [e.target.name]: e.target.value };
    });
  }

  function handleDeleteVer() {
    setDeleteVer(true);
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(
        `http://localhost:5000/customers/${customer.id}`
      );
      console.log(res);
      setDeleteVer(false);
      props.setOpenEdit(false);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogoChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPreviewLogo(URL.createObjectURL(e.target.files[0]));
      setNewLogo(e.target.files[0]);
    }
  }

  return (
    <div>
      <div>
        {props.selectedCustomer && (
          <Dialog open={props.openEdit} onClose={handleClose}>
            <DialogTitle>
              {props.editMode
                ? `Edit Customer ${props.selectedCustomer.customer_name}`
                : 'Create New Customer'}
            </DialogTitle>
            {error && <Alert severity='error'>{error}</Alert>}
            <DialogContent>
              <Stack direction='column' alignItems='center'>
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
                  error={nameVerError !== ''}
                  helperText={nameVerError}
                />

                <FormControl fullWidth></FormControl>

                <Box component='span' sx={{ height: 220, p: 3 }}>
                  <Image
                    src={previewLogo}
                    height='100%'
                    width='100%'
                    duration={0}
                    fit='contain'
                    position='right'
                  />
                </Box>
                <Stack direction='row' alignItems='center'>
                  <label htmlFor='icon-button-file'>
                    <Input
                      accept='image/*'
                      id='icon-button-file'
                      type='file'
                      onChange={handleLogoChange}
                    />
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='span'
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              {props.editMode && (
                <Button onClick={handleDeleteVer}>Delete</Button>
              )}
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <div>
        {props.selectedCustomer && (
          <Dialog
            open={deleteVer}
            onClose={handleClosedeleteVer}
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
              <Button onClick={handleClosedeleteVer}>No</Button>
              <Button onClick={handleDelete} autoFocus>
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}
