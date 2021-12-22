import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button, Modal, Alert } from 'react-bootstrap';
import { BsPen, BsTrash } from 'react-icons/bs';
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OrderDelete from './OrderDelete';
import OrderEdit from './OrderWizard';
import OrderWizard from './OrderWizard';
import OrderSelect from './OrderSelect';

export default function SelectEditDelete(props) {
  return (
    <div>
      <Form
        style={{ display: 'flex', justifyContent: 'center' }}
        className='center'
      >
        <OrderSelect />
        <OrderDelete line={props.line} />
        <OrderWizard line={props.line} />
      </Form>
    </div>
  );
}
