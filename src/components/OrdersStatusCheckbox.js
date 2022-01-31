import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormControlLabel } from '@mui/material';

export default function OrdersStatusCheckbox(props) {
  const status = ['new', 'approved', 'printed', 'shipped'];

  function handleChange(status) {
    setStatusFilter((prevStatusFilter) => {
      const bool = !prevStatusFilter[status];
      return { ...prevStatusFilter, [status]: bool };
    });
    props.handleStatusChange(status);
  }

  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });

  return (
    <div>
      {status.map((st) => (
        <FormControlLabel
          key={st}
          control={<Checkbox />}
          label={st}
          name={st}
          id={`inline-${st}-1`}
          onChange={(e) => {
            console.log(e.target.name);
            handleChange(e.target.name);
          }}
          checked={statusFilter[st]}
        />
      ))}
    </div>
  );
}
