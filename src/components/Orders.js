import React, { useState, useEffect } from 'react';
import OrdersDataTable from '../components/OrdersDataTable';
import OrdersSearch from '../components/OrdersSearch';
import { useSelector } from 'react-redux';
import OrdersDatePicker from '../components/OrdersDatePicker';
import OrdersWizard from '../components/OrdersWizard';
import OrdersStatusCheckbox from './OrdersStatusCheckbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton } from '@mui/material/';
import { useAuth } from '../context/AuthContext';
import { filterData } from '../models/OrdersModel';
import { fetchOrdersList } from '../services/OrdersServices';


export default function Orders(props) {
  const [ordersData, setOrdersData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const { currentUserRole } = useAuth();
  const basicQ = useSelector((state) => state.basicSearch);
  const AdvQ = useSelector((state) => state.advSearchQ);
  const AdvCat = useSelector((state) => state.advSearchCat);
  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });
  const [editMode, setEditMode] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  useEffect(() => {
    async function fetchOrders() {
      const allOrders = await fetchOrdersList(); 
      setOrdersData(allOrders);
      console.log(allOrders);      
    }
    fetchOrders();
  }, [setOrdersData]);

  function handleStatusChange(status) {
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[status];
      return { ...prevStatusFilter, [status]: bool };
    });
  }

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
    setEditMode(false);
    setSelectedOrder({});
    setOpenEdit(true);
  }

  return (
    <div>
      <Box  sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }} >

          
        <IconButton
          size='large'
          color='primary'
          aria-label='new order'
          onClick={handleCreateNewOrder}
        >
        <AddCircleIcon fontSize='large' />
        </IconButton>
     
        <OrdersStatusCheckbox
              handleStatusChange={(status) => handleStatusChange(status)}
            />
        <Box >
          <OrdersDatePicker />
        </Box>
      </Box>
      <OrdersWizard
        selectedOrder={selectedOrder}
        editMode={editMode}
        setOpenEdit={(change) => setOpenEdit(change)}
        openEdit={openEdit}
      />
      <OrdersSearch />
      <div>
        {ordersData && ordersData[0] && (
          <OrdersDataTable ordersData={handleFilterData(ordersData)} />
        )}
      </div>
    </div>
  );
}
