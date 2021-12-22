import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      console.log(emailRef.current.value);
      await login(emailRef.current.value, passwordRef.current.value);

      history.push('/');
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  }

  return (
    <div>
      <Container
        className='d-flex align-items0center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100 pt-5 mx-auto' style={{ maxWidth: '400px' }}>
          <Card.Img variant='top' src='./img/ArtnetLogo.png' />
          <Card.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form className='py-3' onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  ref={passwordRef}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Remember me' />
              </Form.Group>
              <Button
                disabled={loading}
                variant='outline-warning'
                type='submit'
                className='btn  w-100'
              >
                Log In
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/forgot-password'>Forgot password?</Link>
            </div>
          </Card.Body>
          <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
