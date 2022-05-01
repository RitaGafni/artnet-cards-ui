import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Orders from '../orders-new/Orders';
import Companies from '../compenies/Companies';
import Users from '../Users';
import NavBar from '../NavBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`customers-tabpanel-${index}`}
      aria-labelledby={`customers-tab-${index}`}
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
    id: `customers-tab-${index}`,
    'aria-controls': `customers-tabpanel-${index}`,
  };
}

export default function CustomerView(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mt: 4,
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='customers tabs'
            // centered
          >
            <Tab
              className='tab'
              label='Orders'
              {...a11yProps(0)}
              sx={{
                mr: '1rem',
                ml: '2rem',
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  opacity: 0.4,
                  borderRadius: 2,
                },
              }}
            />
            <Tab
              className='tab'
              label='Companies'
              {...a11yProps(1)}
              sx={{
                mr: '1rem',
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  opacity: 0.4,
                  borderRadius: 2,
                },
              }}
            />
            <Tab
              className='tab'
              label='Users'
              {...a11yProps(2)}
              sx={{
                mr: '1rem',
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  opacity: 0.4,
                  borderRadius: 2,
                },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Orders customerId={props.customerId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Companies customerId={props.customerId} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Users customerId={props.customerId} />
        </TabPanel>
      </Box>
    </div>
  );
}
