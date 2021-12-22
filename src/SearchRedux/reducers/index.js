import { combineReducers } from 'redux';
import basicSearchReducer from './BasicSearch';
import advSearchCatReducer from './AdvSearchCat';
import advSearchQReducer from './AdvSearchQ';

const rootReducer = combineReducers({
  basicSearch: basicSearchReducer,
  advSearchCat: advSearchCatReducer,
  advSearchQ: advSearchQReducer,
});

export default rootReducer;
