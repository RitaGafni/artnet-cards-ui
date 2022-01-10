import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button, Modal, Alert } from 'react-bootstrap';
import { BsPen, BsTrash } from 'react-icons/bs';
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';

export default function OrderDelete(props) {
  const [error, setError] = useState('');

  async function deleteOrder(id) {
    console.log('delete!', id);
    try {
      setError('');
      console.log('deleteing id: ', id);
      const res = await axios.delete(`http://localhost:5000/orders/${id}`);
      console.log(res, 'deleted ', props.line.employeeName);
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
      {' '}
      <Button variant='blank' onClick={handleShow}>
        <BsTrash size='1em' />{' '}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this order?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          You're about to delete {props.line.employeeName} from{' '}
          {props.line.company}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => deleteOrder(props.line.id)}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
