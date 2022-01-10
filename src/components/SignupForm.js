import * as React from 'react';
import { Button, Alert } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'mui-image';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#ffc107' },
  },
});

function Signup() {
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log(data);
    if (data.get('password') !== data.get('confirmPassword')) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      console.log(e);
      console.log('email!', data.get('email'));
      await signup(data.get('email'), data.get('password'));

      history.push('/');
    } catch (e) {
      setError('Failed to create account');
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image src='./img/ArtnetLogo.png' duration={500} className='mb-4' />
            <Typography component='h1' variant='h5'>
              Welcome! Please sign up:
            </Typography>
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
              <TextField
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
              />

              <Button
                type='submit'
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/signup'>Already have an account? Log In</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Signup;
