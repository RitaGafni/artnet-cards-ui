import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  DialogTitle,
  DialogContentText,
  InputLabel,
  Select,
} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Image from 'mui-image';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  deleteOrder,
  getURLOfImg,
  postOrder,
  updateOrder,
} from '../controllers/OrdersController';
// import defaultImg from '../images/defaultImg';
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
  const defaultImg = '';
  const [nameVerError, setNameVerError] = useState('');
  const [newImg, setNewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultImg);
  const [error, setError] = useState('');

  const [order, setOrder] = useState({
    id: '',
    employeeName: '',
    company: '',
    status: '',
    creationDate: '',
    customerId: '',
    TZ: '',
    img: '',
  });


  function handleStatusChange(e) {
    setOrder((prevOrder) => {
      return { ...prevOrder, status: e.target.value };
    });
  }

  useEffect(() => {
    if (props.selectedOrder) {
      setOrder({
        id: props.selectedOrder.id,
        employeeName: props.selectedOrder.employeeName,
        company: props.selectedOrder.company,
        status: props.selectedOrder.status,
        creationDate: props.selectedOrder.creationDate,
        customerId: props.selectedOrder.customerId,
        TZ: props.selectedOrder.TZ,
        img: props.selectedOrder.img,
      });
      setPreviewImg(props.selectedOrder.img);
    } else {
      setPreviewImg(defaultImg);
    }
  }, [props.editMode, props.selectedOrder, props.setOpenEdit]);

  async function createNewCustomer() {
    setError('');
    const uploadRef = ref(storage, `${order.customer}.png`);
    try {
      await uploadBytes(uploadRef, newImg);
      const newURL = await getDownloadURL(uploadRef);
      postOrder(order, newURL);
      props.setOpenEdit(false);
      setPreviewImg(defaultImg);
      setNewImg(null);
      window.location.reload(false);
    } catch (err) {
      setError(`couldn't create new customer`);
      console.log(err);
    }
  }

  async function updateEditedOrder() {
    setError('');
    try {
      let imgURLtoUpload = order.img;
      if (newImg) {
        imgURLtoUpload = await getURLOfImg(newImg, order.TZ);
        setNewImg(null);
      }
      await updateOrder(order, imgURLtoUpload);
      props.setOpenEdit(false);
      window.location.reload(false);
    } catch (err) {
      setError(`couldn't update order`);
      console.log(err);
    }
  }

  async function handleSaveChanges() {
    setError('');
    if (
      props.editMode &&
      props.selectedOrder.employeeName === order.employeeName &&
      props.selectedOrder.company === order.company &&
      props.selectedOrder.TZ === order.TZ &&
      !newImg
    ) {
      props.setOpenEdit(false);
      return;
    }

    if (order.employeeName === '') {
      setNameVerError('Name Cannot be blank');
      return;
    }

    if (props.editMode) {
      updateEditedOrder();
    } else {
      createNewCustomer();
    }
  }

  const handleClose = () => {
    props.setOpenEdit(false);
    setNameVerError('');
    setPreviewImg(defaultImg);
  };

  const handleClosedeleteVer = () => {
    props.setDeleteVer(false);
  };

  function handleEditOrder(e) {
    setNameVerError('');
    setOrder((prevOrder) => {
      return { ...prevOrder, [e.target.name]: e.target.value };
    });
  }

  async function handleDelete() {
    try {
      await deleteOrder(props.orderToDelete.id);
      props.setDeleteVer(false);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleImgChange(e) {
    if (e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setNewImg(e.target.files[0]);
    }
  }

  return (
    <div>
      <div>
        <Dialog open={props.openEdit} onClose={handleClose} >
          <DialogTitle>
            {props.editMode ? 'Edit Order' : 'New Order'}
          </DialogTitle>
          <DialogContent sx={{minWidth: 800}}>
            {/* start fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minWitdh: 800}}>
               <Box sx={{ display: 'flex', maxWidth: 300}}>
                <Item>
                      <TextField
                        required
                        id='employeeName'
                        name='employeeName'
                        label='Employee Name'
                        fullWidth
                        autoComplete='given-name'
                        variant='standard'
                        value={order.employeeName}
                        onChange={handleEditOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />

                      <TextField
                        required
                        id='company'
                        name='company'
                        label='Company'
                        fullWidth
                        autoComplete='company'
                        variant='standard'
                        value={order.company}
                        onChange={handleEditOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />
                      <TextField
                        id='customer'
                        name='customer'
                        label='Customer Id'
                        fullWidth
                        autoComplete='customer'
                        variant='standard'
                        value={order.TZ}
                        onChange={handleEditOrder}
                        error={nameVerError !== ''}
                        helperText={nameVerError}
                      />
                        <FormControl fullWidth>
                          <InputLabel id='status'>Status</InputLabel>
                          <Select
                            labelId='status'
                            id='demo-simple-select'
                            value={order.status}
                            label='status'
                            onChange={handleStatusChange}
                          >
                            <MenuItem value='new'>new</MenuItem>
                            <MenuItem value='approved'>approved</MenuItem>
                            <MenuItem value='printed'>printed</MenuItem>
                            <MenuItem value='shipped'>shipped</MenuItem>
                          </Select>
                        </FormControl>
                     
                </Item>                         
                   </Box>
                      <Box>
               


                <Item>
                    <Image
                      src={previewImg}
                      height='100%'
                      width='100%'
                      duration={0}
                      fit='contain'
                    />
                     </Item>
                     </Box>
</Box>
                    




                  <Box>
                    <Item>

                </Item>
                </Box>


                
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChanges}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
      {props.orderToDelete && (
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
        )}
      </div>
    </div>
  );
}
