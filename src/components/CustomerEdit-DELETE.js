import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, Grid, DialogContentText, Stack } from '@mui/material/';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Image from 'mui-image';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export default function CustomerEdit(props) {
  const [deleteVer, setDeleteVer] = useState(false);
  const [nameVer, setNameVer] = useState('');
  const [nameVerError, setNameVerError] = useState('');

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
    }
  }, [props.selectedCustomer, props.setOpenEdit]);

  async function handleEditCustomer() {
    if (props.selectedCustomer.customer_name === customer.customer_name) {
      props.setOpenEdit(false);

      return;
    }
    if (customer.customer_name === '') {
      setNameVerError('Name Cannot be blank');
      setNameVer(true);
      return;
    }
    try {
      console.log('customer id', customer.id);
      console.log(customer);
      const res = await axios.put(
        `http://localhost:5000/customers/${customer.id}`,
        customer
      );
      console.log(res);
      props.setOpenEdit(false);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    props.setOpenEdit(false);
  };

  const handleClosedeleteVer = () => {
    setDeleteVer(false);
  };

  function editCustomerName(e) {
    setNameVerError('');
    setNameVer(false);
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

  return (
    <div>
      <div>
        {props.selectedCustomer && (
          <Dialog open={props.openEdit} onClose={handleClose}>
            <DialogTitle>
              Edit Customer {props.selectedCustomer.customer_name}{' '}
            </DialogTitle>
            <DialogContent>
              <Stack direction='column' alignItems='center' spacing={2}>
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
                  error={nameVer}
                  helperText={nameVerError}
                />

                <FormControl fullWidth></FormControl>

                <Box component='span' sx={{ height: 220, p: 4 }}>
                  <Image
                    src={props.selectedCustomer.logo}
                    className='mb-4 ml-4'
                    height='100%'
                    width='100%'
                    duration={0}
                    fit='contain'
                    position='right'
                  />
                </Box>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <label htmlFor='icon-button-file'>
                    <Input accept='image/*' id='icon-button-file' type='file' />
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
              <Button onClick={handleDeleteVer}>Delete</Button>
              <Button onClick={handleEditCustomer}>Save Changes</Button>
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
