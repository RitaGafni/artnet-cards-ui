import AdvancedSearch from './AdvancedSearch';
import { FormControl, Tab, Tabs, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../SearchRedux';

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

  return (
    <div>
      <div>
        <Tabs
          defaultActiveKey='basicSearch'
          id='uncontrolled-tab-example'
          className='mb-3 mt-3'
          onSelect={(k) => tabSelect(k)}
        >
          <Tab eventKey='basicSearch' title='Search'>
            <InputGroup className='mb-3 mt-3' style={{ width: '30rem' }}>
              <InputGroup.Text id='search-addon1'>
                <BsSearch
                  title='Search'
                  style={{ margin: 2, marginRight: 2 }}
                />{' '}
                Search
              </InputGroup.Text>
              <FormControl
                type='text'
                value={basicSearch}
                onChange={(e) => updateBasicSearchQ(e.target.value)}
                placeholder='type here'
                aria-describedby='BasicSearch'
              />
            </InputGroup>
          </Tab>
          <Tab
            eventKey='advancedSearch'
            title='Advanced Search'
            //onSelect={changeSearchType((e) => e.target.eventKey)}
          >
            <AdvancedSearch
              onChange={(e) => updateAdvSearchQ(e.target.value)}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
