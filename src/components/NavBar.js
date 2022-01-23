import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {
  const { currentUser, currentUserRole, logout } = useAuth();
  const user = currentUser.email.split('@', 1);
  const userRole =  currentUserRole;
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

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



  return (
    <div>
       <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
                        Artnet Cards App

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } } }
          >
            Artnet Cards App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Button Link href='orders' sx={{ my: 2, color: 'white', display: 'block' }}>
              Orders
              </Button>
              <Button Link href='customers' sx={{ my: 2, color: 'white', display: 'block' }}>
              Customers
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Typography  sx={{ my: 2, color: 'white', display: 'block' }}>
                Hello {user} you are 
                
              </Typography>
            </Tooltip>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

      {/* <Navbar bg='light' expand='lg'>
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
      </Navbar> */}
    </div>
  );
}
