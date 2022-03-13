import React, { useState, useEffect, useMemo } from 'react';
import CustomersSearchBar from './CustomersSearchBar';
import { Grid, Container, IconButton, Box } from '@mui/material';
import CustomersWizard from './CustomersWizard';
import CustomerItem from './CustomerItem';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { fetchCustomers } from '../services/CustomerViewServices';
import NavBar from './NavBar';

function Customers(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [customers, setCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [editMode, setEditMode] = useState();

  const [isCustumersUpdatd, setIsCustumersUpdatd] = useState(false);

  useEffect(() => {
    async function fetchCustomersList() {
      const data = await fetchCustomers();
      setCustomers(data);
    }
    fetchCustomersList();
  }, [setCustomers, setIsCustumersUpdatd]);

  useMemo(async () => {
    console.log('use mome');
    const data = await fetchCustomers();
    setCustomers(data);
    setIsCustumersUpdatd(false);
  }, [setIsCustumersUpdatd]);

  console.log(isCustumersUpdatd);

  function filterCustomersData(rows) {
    if (rows[0]) {
      const newData = rows.filter(
        (row) =>
          row.customer_name
            .toString()
            .toLowerCase()
            .indexOf(searchQ.toLowerCase()) > -1
      );
      return newData;
    }
  }

  function handleEdit(customer) {
    setEditMode(true);
    setSelectedCustomer(customer);
    setOpenEdit(true);
  }

  function handleAddCustomer() {
    setEditMode(false);
    setSelectedCustomer({
      id: '',
      customerId: '',
      customer_name: '',
      logo: '',
      new_orders: 0,
    });
    setOpenEdit(true);
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          height: '80%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mt: 4,
            bgcolor: '#F4F9F9',
            borderRadius: 4,
            p: 2,
            pb: 4,
          }}
        >
          <CustomersWizard
            selectedCustomer={selectedCustomer}
            setOpenEdit={(change) => setOpenEdit(change)}
            openEdit={openEdit}
            editMode={editMode}
            setIsCustumersUpdatd={(change) => setIsCustumersUpdatd(change)}
          />
          <Container>
            <Box display='flex'>
              <IconButton
                size='large'
                color='primary'
                aria-label='edit customer'
                component='span'
                onClick={handleAddCustomer}
              >
                <AddCircleTwoToneIcon fontSize='large' />
              </IconButton>

              <CustomersSearchBar setSearchQ={(q) => setSearchQ(q)} />
            </Box>
          </Container>
          <Container className='mt-4'>
            <Grid container spacing={3}>
              {customers &&
                customers[0] &&
                filterCustomersData(customers).map((selectedCustomer) => (
                  <Grid key={selectedCustomer.id} item id={selectedCustomer.id}>
                    <CustomerItem
                      selectedCustomer={selectedCustomer}
                      handleEdit={(customer) => handleEdit(customer)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
}

export default Customers;
