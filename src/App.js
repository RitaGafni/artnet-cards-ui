import UserTable from './components/tables';
import Customers from './components/Customers';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import PrivetRoute from './components/PrivetRoute';
import updateProfile from './components/updateProfile';
import Orders from './components/Orders';
import OrdersTable from './components/OrdersDataTable';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#ffc107' },
  },
});

function App() {
  const state = useSelector((state) => state);

  console.log(state);

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <AuthProvider>
            <div className='App'>
              <Switch>
                <PrivetRoute exact path='/' component={Dashboard} />
                <Route path='/login' component={LoginForm} />
                <Route path='/signup' component={SignupForm} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <PrivetRoute path='/update-profile' component={updateProfile} />
                <Route path='/orders' component={Orders} />
                <Route path='/customers' component={Customers} />
                <Route path='/data' component={OrdersTable} />
              </Switch>
            </div>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
