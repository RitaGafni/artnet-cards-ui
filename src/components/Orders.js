import React, { useState, useEffect } from 'react';
import OrdersDataTable from '../components/OrdersDataTable';
import OrdersSearch from '../components/OrdersSearch';
import { useSelector } from 'react-redux';
import OrdersDatePicker from '../components/OrdersDatePicker';
import OrdersWizard from '../components/OrdersWizard';
import OrdersStatusCheckbox from './OrdersStatusCheckbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Box, Container, Stack, IconButton } from '@mui/material/';
import { useAuth } from '../context/AuthContext';
import { fetchOrdersList } from '../Services/OrdersServices';

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

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await fetchOrdersList();
      setOrdersData(data);
      console.log(data);
    }
    fetchOrders();
  }, [setOrdersData]);

  function handleStatusChange(status) {
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[status];
      return { ...prevStatusFilter, [status]: bool };
    });
  }

  function filterData(rows) {
    if (rows[0]) {
      // filter by status and custumer id
      const newData = rows.filter(
        (row) =>
          currentUserRole !== 'admin' &&
          (row.customerId === props.customerId || props.isAdmin) &&
          Object.keys(statusFilter).some(
            (status) => statusFilter[status] && row.status === status
          )
      );
      if (basicQ) {
        return search(newData);
      } else if (AdvQ[0] || AdvQ[1]) {
        return advSearch(newData);
      } else return newData;
    }
    return ordersData;
  }

  function advSearch(rows) {
    return rows.filter(
      (row) =>
        (![AdvQ[0]] ||
          row[AdvCat[0]]
            .toString()
            .toLowerCase()
            .indexOf(AdvQ[0].toLowerCase()) > -1) &&
        (!AdvQ[1] ||
          row[AdvCat[1]]
            .toString()
            .toLowerCase()
            .indexOf(AdvQ[1].toLowerCase()) > -1)
    );
  }

  function search(rows) {
    if (rows[0]) {
      const columns = rows[0] && Object.keys(rows[0]);
      return rows.filter((row) =>
        columns.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(basicQ.toLowerCase()) >
            -1
        )
      );
    }
  }

  return (
    <div>
      <Box display='flex'>
        <IconButton
          size='large'
          color='primary'
          aria-label='new order'
          onClick={() => setOpenEdit(true)}
        >
          <AddCircleIcon fontSize='large' />
        </IconButton>

        <IconButton color='primary' aria-label='Search orders' size='large'>
          <SearchTwoToneIcon />
        </IconButton>
        <Container sx={{ '& > :not(style)': { m: 1 } }}>
          <Stack direction='row' spacing={1}>
            <OrdersStatusCheckbox
              handleStatusChange={(status) => handleStatusChange(status)}
            />
          </Stack>
        </Container>
        <Container>
          {' '}
          <OrdersDatePicker />
        </Container>
      </Box>

      <OrdersWizard
        selectedOrder={{}}
        editMode={false}
        setOpenEdit={(change) => setOpenEdit(change)}
        openEdit={openEdit}
      />

      <OrdersSearch />
      <div>
        {ordersData && ordersData[0] && (
          <OrdersDataTable ordersData={filterData(ordersData)} />
        )}
      </div>
    </div>
  );
}
