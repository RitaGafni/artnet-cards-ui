import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

export default function OrdersStatusFilter({ statusFilter, setStatusFilter }) {
  const status = ['new', 'approved', 'printed', 'shipped'];

  function handleChange(status) {
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[status];
      return { ...prevStatusFilter, [status]: bool };
    });
  }

  return (
    <div className='status'>
      <div className='status-text'>
        <Typography
          sx={{ m: '0' }}
          variant='subtitle1'
          gutterBottom
          component='div'
        >
          Status:
        </Typography>
      </div>
      <div>
        {status.map((st) => (
          <FormControlLabel
            key={st}
            control={<Checkbox />}
            label={st}
            name={st}
            id={st}
            onChange={(e) => {
              handleChange(e.target.name);
            }}
            checked={statusFilter[st]}
          />
        ))}
      </div>
    </div>
  );
}
