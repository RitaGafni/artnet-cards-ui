import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      console.log(emailRef.current.value);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
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
            {message && <Alert variant='success'>{message}</Alert>}
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

              <Button
                disabled={loading}
                variant='outline-warning'
                type='submit'
                className='btn  w-100'
              >
                Reset Password
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/login'>Login</Link>
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

export default ForgotPassword;
