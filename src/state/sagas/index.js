import {takeEvery, call, put, select} from 'redux-saga/effects';
import axios from 'axios';
import {START_SAGA_ZIPCODES} from '../action-variables/index';
import {changeFetchingState, itemsFetchedSuccess, itemsFetchedError} from '../reducers/items/index';
import {generateUniqueId} from '../../helpers/index';

export const getCurrentState = state => state;

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeEvery(START_SAGA_ZIPCODES, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchZIPCodes(searchValue) {
  return axios({
    method: 'get',
    url: `https://api.zippopotam.us/us/${searchValue}`,
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  const state = yield select(getCurrentState);
  const {isFetching, zipCodeItems, searchValue, currentItem} = state.itemReducer;

  // prevent fetching new data if user are fetching data now
  if (!isFetching) {
    yield put(changeFetchingState(true));
    try {
      const result = yield call(fetchZIPCodes, searchValue);

      // if application has correct response
      if (result.status === 200) {
        const isPostCodeExists = zipCodeItems.some(
          el => el['post code'] === result.data['post code'],
        );

        let newData = [].concat([], zipCodeItems);
        // create or change exists item
        if (!isPostCodeExists) {
          if (!currentItem._id) {
            // create new item
            newData = [].concat(zipCodeItems, {...result.data, _id: generateUniqueId()});
          } else {
            // update exists item
            newData = zipCodeItems.map(el =>
              el._id === currentItem._id ? {...result.data, _id: currentItem._id} : el,
            );
          }
        }

        // generate error text for user
        let searchError = '';
        if (isPostCodeExists) {
          searchError = 'Post code already exists';
        }
        yield put(itemsFetchedSuccess(false, searchError, newData));
      } else {
        yield put(itemsFetchedError(false, 'Something wrong with connection!'));
      }
    } catch (er) {
      console.log(er.response || er);
      let searchError = '';
      if (er.response && er.response.data && er.response.data['post code'] === undefined) {
        searchError = "Post code wasn't found";
      }
      yield put(itemsFetchedError(false, searchError));
    }
  }
}

// SAGAS API:
// https://github.com/redux-saga/redux-saga/tree/master/docs/api#saga-helpers

// it describes: call, put, take, takeLatest, select state, fire parallel fetching,
// https://medium.freecodecamp.org/async-operations-using-redux-saga-2ba02ae077b3
