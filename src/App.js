import UserTable from './components/tables';
import Customers from './Pages/Customers';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './Pages/Login/LoginForm';
import SignupForm from './Pages/Login/SignupForm';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import PrivetRoute from './components/PrivetRoute';
import updateProfile from './Pages/updateProfile';
import Orders from './Pages/Orders';
import { useSelector } from 'react-redux';

function App() {
  const state = useSelector((state) => state);

  console.log(state);

  return (
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
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
