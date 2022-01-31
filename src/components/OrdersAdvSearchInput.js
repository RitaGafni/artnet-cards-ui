import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../SearchRedux';

import {
  TextField,
  Box,
  Stack
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function AdvSearchInput(props) {
  const advSearchCat = useSelector((state) => state.advSearchCat);
  const advSearchQ = useSelector((state) => state.advSearchQ);

  const SearchCat = advSearchCat[props.advNum];

  const dispatch = useDispatch();
  const { updateAdvSearchCat, updateAdvSearchQ } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const categories = {
    employeeName: 'Employee Name',
    company: 'Company',
    id: 'Id',
    TZ: 'Customer Id',
  };

  const [searchButtonName, setSearchButtonName] = useState(
    categories[SearchCat]
  );

  function changeCat(newCat) {
    updateAdvSearchCat(props.advNum, newCat);
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function handleChange(e){
    changeCat(getKeyByValue(categories, e.target.value));
    setSearchButtonName(e.target.value);
  }
  return (
    <div>
      <Box sx={{ display: 'flex',
          alignItems: 'center', 
        }}
           >
      <Box  sx={{
              width: 200,
              maxWidth: '100%',
              m:2
            }}>
      <FormControl variant="standard" sx={{ minWidth: 100 }} fullWidth>
        <TextField
        select
        size='small'
          id="demo-simple-select"
          value={searchButtonName}
           label='Search Category'
          onChange={handleChange}
        >
          { Object.keys(categories).map((category) => 
            <MenuItem value={categories[category]}>{categories[category]}</MenuItem>)
          }
         
        </TextField>
      </FormControl>
    </Box>
    <Box
            sx={{
              width: 300,
              maxWidth: '100%',
            }}
          >
      <TextField
              fullWidth
              size='small'
              id='search orders'
              label='Search Orders'
              variant='outlined'
              value={advSearchQ[props.advNum]}
              onChange={(e) => {
                updateAdvSearchQ(props.advNum, e.target.value);
              }}
            />
            </Box>
             </Box>  
    </div>
  );
}
