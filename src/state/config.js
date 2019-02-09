import {createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

//  init state of all application
const initialState = {};
const enhancers = [];

const middleware = [thunk];

// setup in webpack or launch-server
// if (process.env.NODE_ENV === 'development') {
setDevTools();
// }

// join all middlewares
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

// main store of pur app
export const store = createStore(rootReducer, initialState, composedEnhancers);

// setInterval(()=>{
//   Log.info(store.getState());
// }, 1000)

// use it only in development
function setDevTools() {
  // https://github.com/zalmoxisus/redux-devtools-extension#1-for-chrome
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  // https://github.com/leoasis/redux-immutable-state-invariant
  // only for develop, show message in console, when mutation state without spread, assign...
  const immutableState = require('redux-immutable-state-invariant').default();

  if (typeof immutableState === 'function') {
    middleware.push(immutableState);
  }
}
// curl -X GET "https://virtserver.swaggerhub.com/rdapi/relationdesk/1.0/channels?network_type=NETWORK_TYPE_FACEBOOK" -H "accept: application/json" -H "X-RD-TRACE: dasdsadasdasdas"
// curl -X GET "https://virtserver.swaggerhub.com/rdapi/relationdesk/1.0/channel/NETWORK_TYPE_FACEBOOK/team/STATE_NOT_DONE?account_id=321321321" -H "accept: application/json" -H "X-RD-TRACE: adasdas"
