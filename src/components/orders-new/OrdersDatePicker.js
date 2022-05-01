import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function OrdersDatePicker() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const date = JSON.stringify(startDate);

  function handleStartDateChange(date) {
    console.log('before', date);
    const startDate = JSON.stringify(date);
    console.log('after', startDate);

    setStartDate(date);
  }

  return (
    <div>
      <div className='date-picker-text'>
        <Typography
          sx={{ m: '0' }}
          variant='subtitle1'
          gutterBottom
          component='div'
        >
          Select Dates:
        </Typography>
      </div>
      <Box sx={{ display: 'flex' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartDateChange(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable={true}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          placeholderText='Start Date'
        />
        <Box sx={{ mx: 1 }}>to</Box>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          isClearable={true}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          placeholderText='End Date'
        />
      </Box>
    </div>
  );
}
