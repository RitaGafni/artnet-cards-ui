import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  DialogTitle,
  DialogContentText,
  Stack,
  Alert,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from '@mui/material/';
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

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomerWizard(props) {
  const [deleteVer, setDeleteVer] = useState(false);
  const [nameVerError, setNameVerError] = useState('');
  const [newLogo, setNewLogo] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultImage);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const [order, setOrder] = useState({
    id: '',
    employeeName: '',
    company: '',
    status: '',
    creationDate: '',
    customer: '',
    img: '',
  });

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  useEffect(() => {
    if (props.selectedOrder) {
      setOrder({
        id: props.selectedOrder.id,
        employeeName: props.selectedOrder.employeeName,
        company: props.selectedOrder.company,
        status: props.selectedOrder.status,
        creationDate: props.selectedOrder.creationDate,
        customer: props.selectedOrder.customer,
        img: props.selectedOrder.img,
      });
      setPreviewImg(props.selectedOrder.img);
    }
    setPreviewImg(defaultImage);
  }, [props.editMode, props.selectedOrder, props.setOpenEdit]);

  async function createNewCustomer() {
    setError('');
    const uploadRef = ref(storage, `${order.customer}.png`);
    try {
      const snapshot = await uploadBytes(uploadRef, newLogo);
      const newURL = await getDownloadURL(uploadRef);
      const res = await axios.post('http://localhost:5000/orders/', {
        id: '',
        employeeName: order.employeeName,
        company: order.company,
        status: order.status,
        creationDate: order.creationDate,
        customer: order.customer,
        img: newURL,
      });
      console.log(res);
      props.setOpenEdit(false);
      setPreviewImg(defaultImage);
      setNewLogo(null);
      console.log('reload window!');
      window.location.reload(false);
    } catch (err) {
      setError(`couldn't create new customer`);
      console.log(err);
    }
  }

  async function editCustomer() {
    var URL = order.img;
    setError('');
    try {
      if (newLogo) {
        const uploadRef = ref(storage, `${order.customer}.png`);
        const snapshot = await uploadBytes(uploadRef, newLogo);
        URL = await getDownloadURL(uploadRef);
        setNewLogo(null);
      }

      const res = await axios.put(
        `http://localhost:5000/customers/${order.id}`,
        {
          id: order.id,
          employeeName: order.employeeName,
          company: order.company,
          status: order.status,
          creationDate: order.creationDate,
          customer: order.customer,
          img: URL,
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
      props.selectedOrder.customer_name === order.employeeName &&
      !newLogo
    ) {
      props.setOpenEdit(false);

      return;
    }

    if (order.employeeName === '') {
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
    setPreviewImg(defaultImage);
  };

  const handleClosedeleteVer = () => {
    setDeleteVer(false);
  };

  function editOrder(e) {
    setNameVerError('');
    setOrder((prevOrder) => {
      return { ...prevOrder, [e.target.name]: e.target.value };
    });
  }

  function handleDeleteVer() {
    setDeleteVer(true);
  }

  // async function handleDelete() {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:5000/customers/${customer.id}`
  //     );
  //     console.log(res);
  //     setDeleteVer(false);
  //     props.setOpenEdit(false);
  //     window.location.reload(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleLogoChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setNewLogo(e.target.files[0]);
    }
  }

  return (
    <div>
      <div>
        <Dialog open={props.openEdit} onClose={handleClose}>
          <DialogTitle>{props.new ? 'New Order' : 'Edit Order'}</DialogTitle>
          <DialogContent>
            <Grid container xs={18} sm={12}>
              <Stack direction='row'>
                <Item>
                  {' '}
                  <Grid direction='column'>
                    <Grid item xs={12} sm={6} className='mb-3'>
                      <TextField
                        required
                        id='employeeName'
                        name='employeeName'
                        label='Employee Name'
                        fullWidth
                        autoComplete='given-name'
                        variant='standard'
                        value={order.employeeName}
                        onChange={editOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} className='mb-3'>
                      <TextField
                        required
                        id='company'
                        name='company'
                        label='Company'
                        fullWidth
                        autoComplete='company'
                        variant='standard'
                        value={order.company}
                        onChange={editOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className='mb-3'>
                      <TextField
                        id='customer'
                        name='customer'
                        label='Customer Id'
                        fullWidth
                        autoComplete='customer'
                        variant='standard'
                        value={order.customer}
                        onChange={editOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }} className='mt-4'>
                        <FormControl fullWidth>
                          <InputLabel id='status'>Status</InputLabel>
                          <Select
                            labelId='status'
                            id='demo-simple-select'
                            value={status}
                            label='status'
                            onChange={handleStatusChange}
                          >
                            <MenuItem value={'new'}>new</MenuItem>
                            <MenuItem value={'approved'}>approved</MenuItem>
                            <MenuItem value={'printed'}>printed</MenuItem>
                            <MenuItem value={'shipped'}>shipped</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Item>
                <Item>
                  <Box
                    component='span'
                    sx={{
                      width: 200,
                      height: 200,
                    }}
                  >
                    <Image
                      src={previewImg}
                      height='100%'
                      width='100%'
                      duration={0}
                      fit='contain'
                      position='right'
                    />
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
                  </Box>
                </Item>
              </Stack>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChanges}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
