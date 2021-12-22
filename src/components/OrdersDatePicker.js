import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'react-bootstrap';

export default function OrdersDatePicker() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log(startDate);
  const date = JSON.stringify(startDate);
  console.log(date);
  return (
    <div>
      <Row>
        <Col>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable={true}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
        </Col>
        <Col>
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
          />
        </Col>
      </Row>
    </div>
  );
}
