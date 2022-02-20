import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersSearchBar from './CustomersSearchBar';
import { Grid, Container, IconButton, Box } from '@mui/material';
import CustomersWizard from './CustomersWizard';
import CustomerItem from './CustomerItem';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

function Customers(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [customers, setCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [editMode, setEditMode] = useState();

  useEffect(() => {
    async function fetchOrdersList() {
      const { data } = await axios('http://localhost:5000/customers'); //CHANGE IT!!!!!!
      console.log(data);
      setCustomers(data);
    }
    fetchOrdersList();
  }, [setCustomers]);

  
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
      customer_name: '',
      logo: '',
      new_orders: 0,
    });
    setOpenEdit(true);
  }

  return (
    <div>
      <Box>
        <CustomersWizard
          selectedCustomer={selectedCustomer}
          setOpenEdit={(change) => setOpenEdit(change)}
          openEdit={openEdit}
          editMode={editMode}
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
  );
}

export default Customers;
