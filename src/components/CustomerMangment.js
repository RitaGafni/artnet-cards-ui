import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function CustomerMangment() {
  return (
    <div>
      <DropdownButton id='dropdown-basic-button' title='Dropdown button'>
        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}