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
      <Container>
        <Box>
          <Fab
            onClick={handleChangeAdvancedMenu}
            variant='extended'
            color='primary'
          >
            <ManageSearchIcon sx={{ mr: 1 }} />
            Advanced Search
          </Fab>
        </Box>
        {!checked && (
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
        )}

        {checked && (
          <Box sx={{ height: 160 }}>
            <Box sx={{ display: 'flex' }}>
              <OrdersAdvancedSearch
                onChange={(e) => updateAdvSearchQ(e.target.value)}
              />
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
}
