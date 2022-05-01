import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import {
  deleteOrder,
  getURLOfImg,
  postOrder,
  updateOrder,
} from '../../controllers/OrdersController';
import OrderdFields from './OrdersWizardFields';
import OrderPicture from './OrdersWizardPicture';
import AddPicture from './OrdersWizardAddPicture';
import OrdersSubmit from './OrdersWizardSubmit';

export default function OrdersWizard(props) {
  const defaultImg = '';
  const [employeeNameValidation, setEmployeeNameValidation] = useState('');
  const [employeeIdValidation, setEmployeeIdValidation] = useState('');
  const [companyValidation, setCompanyValidation] = useState('');
  const [newImg, setNewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultImg);
  const [isLoading, setIsLoading] = useState(false);
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
    }
  }, [props.selectedOrder, props.setOpenEdit]);

  async function createNewCustomer() {
    setError('');
    const uploadRef = ref(storage, `${order.customer}.png`);
    try {
      setIsLoading(true);
      await uploadBytes(uploadRef, newImg);
      const newURL = await getDownloadURL(uploadRef);
      postOrder(order, newURL);
      setIsLoading(false);
      props.setOpenEdit(false);
      setPreviewImg(defaultImg);
      setNewImg(null);
      props.setReloadOrders(true);
    } catch (err) {
      setIsLoading(false);
      setError(`couldn't create new customer`);
      console.log(err);
    }
  }

  async function updateEditedOrder() {
    setError('');
    try {
      setIsLoading(true);
      let imgURLtoUpload = order.img;
      if (newImg) {
        imgURLtoUpload = await getURLOfImg(newImg, order.TZ);
        setNewImg(null);
      }
      await updateOrder(order, imgURLtoUpload);
      setIsLoading(false);
      props.setOpenEdit(false);
      props.setReloadOrders(true);
    } catch (err) {
      setIsLoading(false);
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

    if (!isOrderValid()) {
      return;
    }

    if (props.editMode) {
      updateEditedOrder();
    } else {
      createNewCustomer();
    }
  }

  const resetValidation = () => {
    setEmployeeNameValidation('');
    setEmployeeIdValidation('');
    setCompanyValidation('');
  };

  const isOrderValid = () => {
    let isValid = true;
    if (order.employeeName === '') {
      setEmployeeNameValidation('Name Cannot be blank');
      isValid = false;
    }
    if (isNaN(+order.TZ)) {
      setEmployeeIdValidation('Employee ID must be a number');
      isValid = false;
    }
    if (order.company === '') {
      setCompanyValidation('Company Cannot be blank');
      isValid = false;
    }
    if (order.TZ === '') {
      setEmployeeIdValidation('Employee ID Cannot be blank');
      isValid = false;
    }
    return isValid;
  };

  const handleClose = () => {
    resetValidation();
    props.setOpenEdit(false);
    setPreviewImg(defaultImg);
  };

  const handleClosedeleteVer = () => {
    props.setDeleteVer(false);
  };

  function handleEditOrder(e) {
    resetValidation();
    setOrder((prevOrder) => {
      return { ...prevOrder, [e.target.name]: e.target.value };
    });
  }

  function handleSelectCompany(companyName) {
    resetValidation();
    setOrder((prevOrder) => {
      return { ...prevOrder, company: companyName };
    });
  }

  async function handleDelete() {
    try {
      await deleteOrder(props.orderToDelete.id);
      props.setDeleteVer(false);
      props.setReloadOrders(true);
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
        {error && <Alert severity='error'>{error}</Alert>}
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
                  employeeNameValidation={employeeNameValidation}
                  employeeIdValidation={employeeIdValidation}
                  companyValidation={companyValidation}
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
                  <AddPicture
                    isLoading={isLoading}
                    handleImgChange={handleImgChange}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <Box id='order-submit-buttons' sx={{ display: 'flex' }}>
          <OrdersSubmit
            handleSaveChanges={handleSaveChanges}
            handleClose={handleClose}
            isLoading={isLoading}
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
