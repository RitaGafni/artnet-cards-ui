import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Button, Alert } from '@mui/material'


export default function Logout() {
    const [error, setError] = useState('');
    const {  logout } = useAuth();
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
        {error & <Alert severity='error'>{error}</Alert>}
        <Button href='login' variant='link' onClick={handleLogout}>
    Log Out
  </Button></div>
  )
}
