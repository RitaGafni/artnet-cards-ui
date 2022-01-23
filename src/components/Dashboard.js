import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  FormControl,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material/';
import CustomerView from './CustomerView';
import { fetchCustomers } from '../Services/CustomerServices';
import CustomerItem from './CustomerItem';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [customersList, setCustomersList] = useState('');

  const [customer, setCustumer] = useState('');
  const [customerId, setCustomerId] = useState();

  function getCustomerIdByValue(object, value) {
    console.log(Object.keys(object));
    var keyNum = Object.keys(object).find(
      (key) => object[key].customer_name === value
    );
    return customersList[keyNum].id;
  }

  const handleChange = (event) => {
    setCustumer(event.target.value);
    console.log('this is the', event.target.value);
    console.log(customersList);
    setCustomerId(getCustomerIdByValue(customersList, event.target.value));
  };

  useEffect(() => {
    async function fetchCustumersList() {
      const { data } = await fetchCustomers();
      setCustomersList(data);
    }
    fetchCustumersList();
  }, [setCustomersList]);

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div>
      <Box>
        <Button href='login' variant='link' onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id='choose-customer'>{CustomerItem}</InputLabel>
          <Select
            labelId='company'
            id='choose-company'
            value={customer}
            label='company'
            onChange={handleChange}
          >
            {customersList &&
              customersList[0] &&
              customersList.map((item) => (
                <MenuItem value={item.customer_name}>
                  {item.customer_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <CustomerView customerId={customerId} />
    </div>
  );
}
