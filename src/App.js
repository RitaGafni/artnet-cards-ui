import UserTable from './components/tables';
import Customers from './components/Customers';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
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
import NavBar from './components/NavBar';
// import { useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: { main: '#64C9CF' },
  },
});

function App() {
  const state = useSelector((state) => state);
  // const { currentUser } = useAuth();

  console.log(state);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <NavBar />

          <div className='App'>
            <Switch>
              <PrivetRoute exact path='/' component={Dashboard} />
              <Route path='/login' component={LoginForm} />
              <Route path='/signup' component={SignupForm} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <PrivetRoute path='/update-profile' component={updateProfile} />
              {/* <Route path='/orders' component={Orders} isAdmin={true} /> */}
              <Route path='/customers' component={Customers} />
              <Route path='/orders'>
                <Orders isAdmin={true} />
              </Route>
              <Route path='/data' component={OrdersTable} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
