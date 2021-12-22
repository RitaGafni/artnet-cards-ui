import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function OrderSelect() {
  const [selectedOrders, setSelectedOrders] = useState([]);

  return (
    <div>
      <div key='checkbox '>
        <Form.Check
          inline
          type='checkbox'
          style={{ verticalAlign: 'middle' }}
        />
      </div>
    </div>
  );
}
