import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Singup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      console.log(emailRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (e) {
      setError('Failed to create account ' + e);
    }

    setLoading(false);
  }

  return (
    <div>
      <Container
        className='d-flex align-items center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100 pt-5 mx-auto' style={{ maxWidth: '400px' }}>
          <Card.Img variant='top' src='./img/ArtnetLogo.png' />
          <Card.Body>
            {currentUser && currentUser.email}
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
              <Form.Group className='mb-3' controlId='formBasicPasswordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Re-enter Password'
                  ref={passwordConfirmRef}
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
                Sign Up
              </Button>
            </Form>
          </Card.Body>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Singup;
