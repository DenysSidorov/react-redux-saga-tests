import {combineReducers} from 'redux';
import itemReducer from './items';
import windowSizeReducer from './sizeReducer';

// config of reducers
export default combineReducers({
  itemReducer,
  windowSizeReducer,
});
