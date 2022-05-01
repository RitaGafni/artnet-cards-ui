import React, { useEffect, useState } from 'react';
import OrdersAdvancedSearch from './OrdersAdvancedSearch';
import { FormControl, Tab, Tabs, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../searchRedux';
import { TextField, Box, Fab } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import Grow from '@mui/material/Grow';

export default function OrdersSearch(props) {
  const basicSearch = useSelector((state) => state.basicSearch);
  const dispatch = useDispatch();
  const { updateBasicSearchQ, updateAdvSearchQ } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [checked, setChecked] = useState(false);

  const handleChangeAdvancedMenu = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',

          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ m: 1, p: 1 }}>
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
          <div>
            <Box sx={{ height: 160 }}>
              <Box sx={{ display: 'flex' }}>
                <OrdersAdvancedSearch
                  onChange={(e) => updateAdvSearchQ(e.target.value)}
                />
              </Box>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
}
