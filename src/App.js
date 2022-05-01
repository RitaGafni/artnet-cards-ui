import Customers from './components/customers/Customers';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import PrivetRoute from './components/PrivetRoute';
// import Orders from './components/orders/Orders';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Template from './components/templates/Template';
import Orders from './components/orders-new/Orders';
// import { useAuth } from './context/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'segoe UI, Arial',
  },
  palette: {
    primary: { main: '#649B92' },
    secondary: { main: '#FFCB05' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <div className='App'>
            <Switch>
              <PrivetRoute exact path='/' component={Dashboard} />
              <Route path='/login' component={LoginForm} />
              <Route path='/signup' component={SignupForm} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/customers' component={Customers} />
              <Route path='/template' component={Template} />
              <Route path='/orders' component={Orders} />

              {/* <Route path='/orders'>
                <Orders isAdmin={true} />
              </Route> */}
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
