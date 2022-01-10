import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import OrdersTable from '../components/OrdersTable';
import OrdersDataTable from '../components/OrdersDataTable';
import NavBar from '../components/NavBar';
import OrdersSearch from '../components/OrdersSearch';
import { useSelector } from 'react-redux';
import OrdersDatePicker from '../components/OrdersDatePicker';
import OrdersWizard from '../components/OrdersWizard';
import OrdersStatusCheckbox from './OrdersStatusCheckbox';
import OrdersNewOrder from './OrdersNewOrder';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Grid, Box, Container, Stack, IconButton } from '@mui/material/';

export default function Orders() {
  const [ordersData, setOrdersData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const basicQ = useSelector((state) => state.basicSearch);
  const AdvQ = useSelector((state) => state.advSearchQ);
  const AdvCat = useSelector((state) => state.advSearchCat);

  useEffect(() => {
    async function fetchOrdersList() {
      const { data } = await axios('http://localhost:5000/orders');
      setOrdersData(data);
      console.log(data);
    }
    fetchOrdersList();
  }, [setOrdersData]);

  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });

  function handleStatusChange(status) {
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[status];
      return { ...prevStatusFilter, [status]: bool };
    });
  }

  function filterData(rows) {
    if (rows[0]) {
      // filter by status
      const newData = rows.filter((row) =>
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
      <NavBar />
      <Row>
        <Col>
          <IconButton
            size='large'
            color='primary'
            aria-label='new order'
            component='span'
            onClick={() => setOpenEdit(true)}
          >
            <AddCircleIcon fontSize='large' />
          </IconButton>
          <OrdersWizard
            selectedOrder={{}}
            editMode={false}
            setOpenEdit={(change) => setOpenEdit(change)}
            openEdit={openEdit}
          />
        </Col>
        <Col></Col>
      </Row>
      <Container sx={{ '& > :not(style)': { m: 1 } }}>
        <Stack direction='row' spacing={1}>
          <OrdersSearch />
          <OrdersStatusCheckbox
            handleStatusChange={(status) => handleStatusChange(status)}
          />
        </Stack>

        <OrdersDatePicker />
      </Container>

      <div>
        {ordersData && ordersData[0] && (
          <OrdersDataTable ordersData={filterData(ordersData)} />
        )}
      </div>
    </div>
  );
}
