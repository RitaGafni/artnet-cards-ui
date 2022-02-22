import * as React from 'react';
import { Button, Alert, Paper } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'mui-image';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      setError('');
      setLoading(true);
      await login(data.get('email'), data.get('password'));

      history.push('/customers');
    } catch (e) {
      setError('Failed to sign in');
    }

    setLoading(false);
  }

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Paper elevation='4' sx={{ marginTop: 6, p: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image
              src='./img/ArtnetLogo.png'
              duration={500}
              className='mb-4'
              height='60%'
              width='60%'
            />

            {error && <Alert severity='error'>{error}</Alert>}
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='outlined'
                sx={{ mt: 1, mb: 2 }}
                disabled={loading}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/signup'>Don't have an accout? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
