import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Orders from './Orders';
import Companies from './Companies';
import Users from './Users';
import NavBar from './NavBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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
          bgcolor: '#F4F9F9',
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            centered
          >
            <Tab
              label='Orders'
              {...a11yProps(0)}
              sx={{
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  opacity: 0.4,
                  borderRadius: 2,
                },
              }}
            />
            <Tab
              label='Companies'
              {...a11yProps(1)}
              sx={{
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  opacity: 0.4,
                  borderRadius: 2,
                },
              }}
            />
            <Tab
              label='Users'
              {...a11yProps(2)}
              sx={{
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
