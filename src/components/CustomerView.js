import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {fetchOrders} from '../services/CustomerViewServices'
import Orders from './Orders';
import Companies from './Companies';
import Users from './Users';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomerView(props) {
  const [value, setValue] = useState(0);
  const [ordersData, setOrdersData] = useState({})
    const [users, setUsers] = useState({})

    useEffect(() => {
        async function fetchOrdersList() {
          const data = await fetchOrders();
          setOrdersData(data);
          console.log(data);
        }
        fetchOrdersList();
      }, [setOrdersData]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Orders" {...a11yProps(0)} />
          <Tab label="Companies" {...a11yProps(1)} />
          <Tab label="Users" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Orders customerId={props.customerId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Companies customerId={props.customerId}/>
         </TabPanel>
      <TabPanel value={value} index={2}>
        <Users customerId={props.customerId}/>
      </TabPanel>
    </Box>
  );
}