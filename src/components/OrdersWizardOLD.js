import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, Grid, Stack } from '@mui/material/';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Image from 'mui-image';

export default function OrdersWizard(props) {
  const imgSrc = '';
  const [status, setStatus] = useState('');

  function handleChange(event) {
    setStatus(event.target.value);
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      {' '}
      <div>
        <Dialog open={true} onClose={handleClose}>
          <DialogTitle>{props.new ? 'New Order' : 'Edit Order'}</DialogTitle>
          <DialogContent>
            <Grid container xs={24} sm={18}>
              <Grid direction='column'>
                <Grid item xs={12} sm={6} className='mb-3'>
                  <TextField
                    required
                    id='employeeName'
                    name='employeeName'
                    label='Employee Name'
                    fullWidth
                    autoComplete='given-name'
                    variant='standard'
                  />
                </Grid>

                <Grid item xs={12} sm={6} className='mb-3'>
                  <TextField
                    required
                    id='company'
                    name='company'
                    label='Company'
                    fullWidth
                    autoComplete='company'
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='mb-3'>
                  <TextField
                    id='customer'
                    name='customer'
                    label='Customer Id'
                    fullWidth
                    autoComplete='customer'
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 120 }} className='mt-4'>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='demo-simple-select'
                        value={status}
                        label='status'
                        onChange={handleChange}
                      >
                        <MenuItem value={'new'}>new</MenuItem>
                        <MenuItem value={'approved'}>approved</MenuItem>
                        <MenuItem value={'printed'}>printed</MenuItem>
                        <MenuItem value={'shipped'}>shipped</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box component='span' sx={{ p: 3 }}>
                <Image
                  src={imgSrc}
                  className='mb-4 ml-4'
                  height='100%'
                  width='100%'
                  duration={0}
                />
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
