import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import CustomersSearchBar from './CustomersSearchBar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button,
  Grid,
  Paper,
  Container,
  Badge,
  Stack,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomersWizard from './CustomersWizard';

function Customers(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [customers, setCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [editMode, setEditMode] = useState();

  useEffect(() => {
    async function fetchOrdersList() {
      const { data } = await axios('http://localhost:5000/customers');
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
      <NavBar />
      <CustomersWizard
        selectedCustomer={selectedCustomer}
        setOpenEdit={(change) => setOpenEdit(change)}
        openEdit={openEdit}
        editMode={editMode}
      />
      <CustomersSearchBar setSearchQ={(q) => setSearchQ(q)} />
      <IconButton
        color='primary'
        aria-label='edit customer'
        component='span'
        onClick={handleAddCustomer}
      >
        <AddCircleIcon />
      </IconButton>
      <Container className='mt-4'>
        <Grid container spacing={3}>
          {customers &&
            customers[0] &&
            filterCustomersData(customers).map((selectedCustomer) => (
              <Grid item id={selectedCustomer.id}>
                <Badge
                  badgeContent={selectedCustomer.new_orders}
                  color='primary'
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: 18,
                      height: 30,
                    },
                  }}
                >
                  <Paper sx={{ width: 200 }}>
                    <Card
                      asButton
                      onClick={() =>
                        console.log(selectedCustomer.customer_name)
                      }
                    >
                      <Stack direction='row' alignItems='left' spacing={2}>
                        <Typography gutterTop variant='h6' component='div'>
                          <IconButton
                            color='primary'
                            aria-label='edit customer'
                            component='span'
                            onClick={() => handleEdit(selectedCustomer)}
                          >
                            <EditIcon />
                          </IconButton>
                          {selectedCustomer.customer_name}
                        </Typography>
                      </Stack>
                      <Button>
                        <Box sx={{ width: 190, hight: 200 }}>
                          <CardMedia
                            component='img'
                            height='140'
                            image={selectedCustomer.logo}
                            alt={selectedCustomer.customer_name}
                          />
                        </Box>
                      </Button>
                    </Card>
                  </Paper>
                </Badge>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Customers;
