import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, composeEnhancer);

export default store;
