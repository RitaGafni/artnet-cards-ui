import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { currentUser, currentUserRole, logout } = useAuth();
  const user = currentUser.email.split('@', 1);
  const [error, setError] = useState('');

  const history = useHistory();

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
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='#'>Artnet Cards App</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title={`Hello ${user}`} id='navbarScrollingDropdown'>
                <NavDropdown.Item href='#action3'>
                  {' '}
                  You Are {currentUserRole}{' '}
                </NavDropdown.Item>
                <NavDropdown.Item href='#action4'>
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='logout' onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='orders'>Orders</Nav.Link>
              <Nav.Link href='customers'>Customers</Nav.Link>

              <Nav.Link href='#' disabled>
                Link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
