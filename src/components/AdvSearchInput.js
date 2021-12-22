import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  FormControl,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../SearchRedux';

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
    id: 'id',
    customer: 'Customer Id',
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

  return (
    <div>
      <InputGroup className='mb-3'>
        <DropdownButton
          as={ButtonGroup}
          key='search-by'
          variant='outline-secondary'
          title={searchButtonName}
          id='search-by'
        >
          {Object.keys(categories).map((category) => (
            <Dropdown.Item
              onClick={(e) => {
                changeCat(getKeyByValue(categories, e.target.textContent));
                setSearchButtonName(e.target.textContent);
              }}
            >
              {categories[category]}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <FormControl
          aria-label='search input'
          value={advSearchQ[props.advNum]}
          onChange={(e) => {
            updateAdvSearchQ(props.advNum, e.target.value);
          }}
        />
      </InputGroup>
    </div>
  );
}
