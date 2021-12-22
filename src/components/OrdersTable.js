import React, { useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import axios from 'axios';

import ModalOrders from './ModalOrders';
import SelectEditDelete from './OrdersSelectEditDelete';

export default function OrdersTable(props) {
  const ordersData = props.ordersData;

  function statusColor(status) {
    var color;
    switch (status) {
      case 'new':
        color = 'warning';
        break;
      case 'approved':
        color = 'info';
        break;
      case 'printed':
        color = 'secondary';
        break;
      case 'shipped':
        color = 'success';
        break;
      default:
        color = 'danger';
    }

    return color;
  }

  return (
    <div>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th style={{ width: '8rem' }}></th>
            <th>Employee Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Creation Date</th>
            <th>Customer Id</th>
          </tr>
        </thead>
        <tbody>
          {ordersData &&
            ordersData.map((item) => (
              <tr key={item.id}>
                <td>
                  <SelectEditDelete
                    line={item}
                    updateTable={props.updateTable}
                  />
                </td>

                <td>
                  <ModalOrders newOrder={item} />
                </td>
                <td>{item.company}</td>
                <td>
                  <h5>
                    <Badge bg={statusColor(item.status)}>{item.status}</Badge>
                  </h5>
                </td>
                <td>{item.creationDate}</td>
                <td>{item.customer}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
