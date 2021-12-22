import React, { useState } from 'react';
import {
  InputGroup,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Dropdown,
  Image,
} from 'react-bootstrap';
import { BsPen } from 'react-icons/bs';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import storage from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { MdImageSearch } from 'react-icons/md';
import OrderUploadImage from './OrderUploadImage';

export default function OrderWizard(props) {
  if (props.newOrder) {
    console.log('this is a new order');
  }

  const [editedOrder, setEditedOrder] = useState({
    id: props.line.id,
    employeeName: props.line.employeeName,
    company: props.line.company,
    status: props.line.status,
    creationDate: props.line.creationDate,
    customer: props.line.customer,
    img: props.line.img,
  });
  const [dropDownButtonName, setDropDownButtonName] = useState(
    editedOrder.status
  );

  const status = ['new', 'approved', 'printed', 'shipped'];
  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });

  function handleStatusChange(e) {
    console.log(e);
  }

  const [error, setError] = useState('');

  async function editOrder(e) {
    setEditedOrder({
      ...editedOrder,
      [e.target.name]: e.target.value,
    });

    console.log('name ', editedOrder.employeeName);
  }

  async function updateOrder(id) {
    console.log('delete!', id);
    try {
      setError('');
      console.log('deleteing id: ', id);
      const res = await axios.delete(`http://localhost:5000/orders/${id}`);
      console.log(res, 'deleted ', editedOrder.employeeName);
      window.location.reload(false);
      handleClose();
    } catch {
      setError('Failed to delete');
    }
  }

  //MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant='blank' onClick={handleShow} className='mb-3'>
        {props.newOrder ? <Button>New Order</Button> : <BsPen size='1.5em' />}{' '}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group as={Row} className='mb-3' controlId='employeeName'>
                  <Form.Label column sm={3}>
                    Employee Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name='employeeName'
                      type='text'
                      value={editedOrder.employeeName}
                      onChange={editOrder}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='company'>
                  <Form.Label column sm={3}>
                    Company
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type='text'
                      name='company'
                      value={editedOrder.company}
                      onChange={editOrder}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='customerId'>
                  <Form.Label column sm={3}>
                    Customer Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type='text'
                      name='customer'
                      value={editedOrder.customer}
                      onChange={editOrder}
                    />
                  </Col>
                </Form.Group>

                <fieldset>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label as='legend' column sm={4}>
                      Status
                    </Form.Label>
                    <Col sm={8}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant='white'
                          as={Button}
                          id='dropdown-basic'
                        >
                          {dropDownButtonName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {status.map((st) => (
                            <Dropdown.Item
                              onClick={(e) => {
                                handleStatusChange(e.target.textContent);
                                setDropDownButtonName(e.target.textContent);
                              }}
                            >
                              {st}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Form.Group>
                </fieldset>
              </Form>
            </Col>
            <Col md='auto'>
              <Row md='auto' className='mb-3'>
                {' '}
                <Image src={editedOrder.img} thumbnail />
              </Row>
              <Row md='auto'>
                <OrderUploadImage />
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => editOrder(props.line.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
