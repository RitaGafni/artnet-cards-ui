import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import OrdersTable from '../components/OrdersTable';
import NavBar from '../components/NavBar';
import OrdersSearch from '../components/OrdersSearch';
import { useSelector } from 'react-redux';
import OrdersDatePicker from '../components/OrdersDatePicker';
import OrderWizard from '../components/OrderWizard';

export default function Orders() {
  const [ordersData, setOrdersData] = useState({});

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

  //CHECKBOX
  const status = ['new', 'approved', 'printed', 'shipped'];

  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });

  function handleStatusChange(e) {
    const Sname = e.target.name;
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[Sname];
      return { ...prevStatusFilter, [Sname]: bool };
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
      <OrdersSearch />
      <Row>
        <Col>
          <Form style={{ display: 'flex', justifyContent: 'left' }}>
            <div key='checkbox ' className='mb-3'>
              {status.map((st) => (
                <Form.Check
                  inline
                  label={st}
                  name={st}
                  type='checkbox'
                  id={`inline-${st}-1`}
                  onChange={handleStatusChange}
                  defaultChecked={statusFilter[st]}
                />
              ))}
            </div>
          </Form>
        </Col>
        <Col>
          <OrderWizard line={{}} newOrder={true} />
        </Col>
        <Col>
          <OrdersDatePicker />
        </Col>
      </Row>
      <div>
        {ordersData && ordersData[0] && (
          <OrdersTable ordersData={filterData(ordersData)} />
        )}
      </div>
    </div>
  );
}
