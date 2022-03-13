import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { InputLabel, Select } from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { fetchCompanies } from '../services/CustomerViewServices';

export default function OrderdFields(props) {
  const [companiesList, setCompaniesList] = useState();

  useEffect(() => {
    async function fetchCompaniesList(id) {
      const data = await fetchCompanies(id);
      setCompaniesList(data);
    }
    fetchCompaniesList(props.customerId);
  }, [setCompaniesList, props.customerId]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 200,
          mb: 1,
        }}
      >
        <Box>
          <TextField
            sx={{ mb: 1 }}
            required
            id='employeeName'
            name='employeeName'
            label='Employee Name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={props.order.employeeName}
            onChange={props.handleEditOrder}
            error={props.employeeNameValidation !== ''}
            helperText={props.employeeNameValidation}
          />

          <TextField
            sx={{ mb: 1 }}
            id='customer'
            name='TZ'
            label='Employee Identification'
            fullWidth
            autoComplete='customer'
            variant='standard'
            value={props.order.TZ}
            onChange={props.handleEditOrder}
            error={props.employeeIdValidation !== ''}
            helperText={props.employeeIdValidation}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Autocomplete
            sx={{ mb: 1 }}
            id='select-company'
            value={props.order.company}
            name='company'
            options={companiesList ? companiesList : []}
            renderOption={(props, companiesList) => (
              <Box component='li' {...props} key={companiesList.id}>
                {companiesList.companyName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                error={props.companyValidation !== ''}
                helperText={props.companyValidation}
                {...params}
                label='Company'
              />
            )}
            onChange={(e, companiesList) =>
              props.handleSelectCompany(companiesList.companyName)
            }
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id='status'>Status</InputLabel>
            <Select
              labelId='status'
              name='status'
              id='status-select'
              value={props.order.status || ''}
              label='status'
              onChange={props.handleStatusChange}
            >
              <MenuItem value='new'>new</MenuItem>
              <MenuItem value='approved'>approved</MenuItem>
              <MenuItem value='printed'>printed</MenuItem>
              <MenuItem value='shipped'>shipped</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}
