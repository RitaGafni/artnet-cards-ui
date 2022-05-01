import React, { useState, useEffect } from 'react';
import OrdersDataTable from './OrdersDataTable';
import OrdersSearch from './OrdersSearch';
import { useSelector } from 'react-redux';
import OrdersDatePicker from './OrdersDatePicker';
import OrdersWizard from './OrdersWizard';
import OrdersStatusCheckbox from './OrdersStatusCheckbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material/';
import { useAuth } from '../../context/AuthContext';
import { filterData } from '../../models/OrdersModel';
import { fetchOrders } from '../../services/CustomerViewServices';
import DeleteMultipleOrders from './OrdersDeleteMultipleOrders';

export default function Orders(props) {
  const [ordersData, setOrdersData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const { currentUserRole } = useAuth();
  const basicQ = useSelector((state) => state.basicSearch);
  const AdvQ = useSelector((state) => state.advSearchQ);
  const AdvCat = useSelector((state) => state.advSearchCat);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });
  const [editMode, setEditMode] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  const [reloadOrders, setReloadOrders] = useState(true);

  useEffect(() => {
    async function fetchOrdersList() {
      const allOrders = await fetchOrders();
      setOrdersData(allOrders);
      setReloadOrders(false);
    }
    if (reloadOrders) {
      fetchOrdersList();
    }
  }, [setOrdersData, reloadOrders]);

  function handleFilterData(rows) {
    if (rows[0]) {
      return filterData(
        rows,
        currentUserRole,
        props.isAdmin,
        statusFilter,
        props.customerId,
        basicQ,
        AdvQ,
        AdvCat
      );
    }
    return ordersData;
  }

  function handleCreateNewOrder() {
    setSelectedOrder({
      id: '',
      employeeName: '',
      company: '',
      status: 'new',
      creationDate: '',
      customerId: parseInt(props.customerId),
      TZ: '',
      img: '',
    });
    setEditMode(false);
    setOpenEdit(true);
  }

  const handleDeleteSelectedOrders = () => {
    setOpenDeleteDialog(true);
    console.log(selectedOrders);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      <DeleteMultipleOrders
        numberOfOrdersToDelete={selectedOrders.length}
        openDeleteDialog={openDeleteDialog}
        handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <IconButton
            // color='secondary '
            aria-label='new order'
            onClick={handleCreateNewOrder}
          >
            <AddCircleIcon fontSize='large' />
          </IconButton>

          {selectedOrders[0] && (
            <IconButton
              // color='primary'
              aria-label='delete selected orders'
              onClick={handleDeleteSelectedOrders}
            >
              <DeleteIcon fontSize='large' />
            </IconButton>
          )}
        </Box>
        <OrdersStatusCheckbox />
        <Box>
          <OrdersDatePicker />
        </Box>
      </Box>
      <OrdersWizard
        selectedOrder={selectedOrder}
        editMode={editMode}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        customerId={props.customerId}
        setReloadOrders={setReloadOrders}
      />
      <OrdersSearch />
      <div>
        {ordersData && ordersData[0] && (
          <OrdersDataTable
            ordersData={handleFilterData(ordersData)}
            customerId={props.customerId}
            setReloadOrders={setReloadOrders}
            setSelectedOrders={setSelectedOrders}
            selectedOrders={selectedOrders}
          />
        )}
      </div>
    </Box>
  );
}
