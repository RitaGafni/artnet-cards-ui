import React, { useEffect, useState } from 'react';
import OrdersAdvancedSearch from './OrdersAdvancedSearch';
import { FormControl, Tab, Tabs, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../SearchRedux';
import {
  Container,
  TextField,
  Box,
  Button,
  Stack,
  Grid,
  Fab,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import Grow from '@mui/material/Grow';

export default function OrdersSearch(props) {
  const basicSearch = useSelector((state) => state.basicSearch);
  const dispatch = useDispatch();
  const { updateBasicSearchQ, updateAdvSearchQ } = bindActionCreators(
    actionCreators,
    dispatch
  );

  function tabSelect(k) {
    switch (k) {
      case 'basicSearch':
        updateAdvSearchQ(0, '');
        updateAdvSearchQ(1, '');
        break;
      case 'advancedSearch':
        updateBasicSearchQ('');
        break;

      default:
        break;
    }
  }

  const [checked, setChecked] = useState(false);

  const handleChangeAdvancedMenu = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <div>
        <Tabs
          defaultActiveKey='basicSearch'
          id='uncontrolled-tab-example'
          className='mb-3 mt-3'
          onSelect={(k) => tabSelect(k)}
        >
          <Tab eventKey='basicSearch' title='Search'>
            <InputGroup className='mb-3 mt-3' style={{ width: '30rem' }}>
              <InputGroup.Text id='search-addon1'>
                <BsSearch
                  title='Search'
                  style={{ margin: 2, marginRight: 2 }}
                />{' '}
                Search
              </InputGroup.Text>
            </InputGroup>
          </Tab>
          <Tab
            eventKey='advancedSearch'
            title='Advanced Search'
            //onSelect={changeSearchType((e) => e.target.eventKey)}
          >
            <OrdersAdvancedSearch
              onChange={(e) => updateAdvSearchQ(e.target.value)}
            />
          </Tab>
        </Tabs>
      </div>
      <Container>
        <Stack direction='row' spacing={2}>
          <Box
            sx={{
              width: 400,
              maxWidth: '100%',
            }}
          >
            <TextField
              fullWidth
              size='small'
              id='adv search'
              label='Search Orders'
              variant='outlined'
              margin='normal'
              value={basicSearch}
              onChange={(e) => updateBasicSearchQ(e.target.value)}
            />
          </Box>
          <Grid alignItems='center'>
            <Fab
              onClick={handleChangeAdvancedMenu}
              variant='extended'
              color='primary'
            >
              <ManageSearchIcon sx={{ mr: 1 }} />
              Advanced Search
            </Fab>
          </Grid>
        </Stack>
        {checked && (
          <Box sx={{ height: 80 }}>
            <Box sx={{ display: 'flex' }}>
              <Grow in={checked}>
                <TextField
                  size='small'
                  id='advanced search '
                  label='Advanced Search '
                  variant='outlined'
                  margin='normal'
                  value={basicSearch}
                  onChange={(e) => updateBasicSearchQ(e.target.value)}
                />
              </Grow>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
}
