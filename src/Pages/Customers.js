import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Badge } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import CustomersSearchBar from '../components/CustomersSearchBar';

function Customers(props) {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    async function fetchOrdersList() {
      const { data } = await axios('http://localhost:5000/customers');
      console.log(data);
      setCustomers(data);
    }
    fetchOrdersList();
  }, [setCustomers]);

  function badgeColor(num) {
    switch (true) {
      case num === 0:
        return 'success';
      case 1 < num && num < 11:
        return 'warning';
      case num > 11:
        return 'danger';
      default:
        return 'info';
    }
  }

  return (
    <div>
      <NavBar />
      <CustomersSearchBar />
      <CardGroup>
        {customers &&
          customers[0] &&
          customers.map((customer) => (
            <div className='padding: 2rem'>
              <Card style={{ width: '12rem' }} className='mx-auto my-2'>
                <Card.Img variant='top' height={180} src={`${customer.logo}`} />
                <Card.Body>
                  <div className='mb-3'>
                    <Button variant='primary'>{customer.customer_name}</Button>
                  </div>
                  <Card.Text>
                    <Badge bg={badgeColor(customer.new_orders)}>
                      {customer.new_orders}
                    </Badge>{' '}
                    New Orders
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </CardGroup>
    </div>
  );
}

export default Customers;
