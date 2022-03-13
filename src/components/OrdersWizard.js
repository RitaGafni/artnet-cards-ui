import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  deleteOrder,
  getURLOfImg,
  postOrder,
  updateOrder,
} from '../controllers/OrdersController';
import OrderdFields from './OrdersWizardFields';
import OrderPicture from './OrdersWizardPicture';
import AddPicture from './OrdersWizardAddPicture';
import OrdersSubmit from './OrdersWizardSubmit';

export default function OrdersWizardTRY(props) {
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
    customerId: parseInt(props.customerId),
    TZ: '',
    img: '',
  });

  function handleStatusChange(e) {
    setOrder((prevOrder) => {
      return { ...prevOrder, status: e.target.value };
    });
  }
  useEffect(() => {
    if (props.selectedOrder && props.editMode) {
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
      props.setReloadOrders(true);
      // window.location.reload(false);
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
      props.setReloadOrders(true);
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
      props.selectedOrder.status === order.status &&
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

  function handleSelectCompany(companyName) {
    setNameVerError('');
    setOrder((prevOrder) => {
      return { ...prevOrder, company: companyName };
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
      <Dialog open={props.openEdit} onClose={handleClose}>
        <DialogTitle>{props.editMode ? 'Edit Order' : 'New Order'}</DialogTitle>
        <DialogContent>
          <Box
            id='orders-wizard-window'
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box id='order-details' sx={{ display: 'flex' }}>
              <Box id='fields' sx={{ display: 'flex', maxWidth: 200 }}>
                <OrderdFields
                  order={order}
                  selectedOrder={props.selectedOrder}
                  handleEditOrder={handleEditOrder}
                  handleSelectCompany={handleSelectCompany}
                  nameVerError={nameVerError}
                  handleStatusChange={handleStatusChange}
                  customerId={props.customerId}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  id='picture'
                  sx={{ display: 'flex', ml: 2, maxWidth: 200, minHeight: 220 }}
                >
                  <OrderPicture previewImg={previewImg} />
                </Box>
                <Box
                  id='order-add-pic'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AddPicture handleImgChange={handleImgChange} />
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <Box id='order-submit-buttons' sx={{ display: 'flex' }}>
          <OrdersSubmit
            handleSaveChanges={handleSaveChanges}
            handleClose={handleClose}
          />
        </Box>
      </Dialog>
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
  );
}
