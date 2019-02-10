import axios from 'axios';
import {
  CHANGE_FETCHING_STATE,
  CHANGE_SEARCH_VALUE,
  CHANGE_ERROR_VALUE,
  CHANGE_CODES_VALUES,
  CHANGE_CURRENT_ITEM,
  SET_INITIAL_STATE,
  ITEM_FETCHED_SUCCESS,
  ITEM_FETCHED_ERROR,
} from '../../action-variables/index';

import cities from '../../../api/mocks/cities';

import {generateUniqueId} from '../../../helpers/index';

const initState = {
  currentItem: {},
  searchValue: '',
  searchError: '',
  isFetching: false,
  zipCodeItems: cities || [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case CHANGE_FETCHING_STATE:
      return {...state, isFetching: action.payload};
    case CHANGE_SEARCH_VALUE:
      return {...state, searchValue: action.payload};
    case CHANGE_ERROR_VALUE:
      return {...state, searchError: action.payload};
    case CHANGE_CODES_VALUES:
      return {...state, zipCodeItems: action.payload};
    case CHANGE_CURRENT_ITEM:
      return {...state, currentItem: action.payload};
    case SET_INITIAL_STATE:
      return {...state, currentItem: {}, searchValue: '', searchError: ''};
    case ITEM_FETCHED_ERROR:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        searchError: action.payload.searchError,
      };
    case ITEM_FETCHED_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        zipCodeItems: action.payload.zipCodeItems,
        searchValue: action.payload.searchValue,
        searchError: action.payload.searchError,
      };
    default:
      return state;
  }
};

export const changeFetchingState = stateBool => ({
  type: CHANGE_FETCHING_STATE,
  payload: stateBool,
});

export const changeSearchValue = searchString => ({
  type: CHANGE_SEARCH_VALUE,
  payload: searchString,
});

export const changeErrorValue = errorString => ({
  type: CHANGE_ERROR_VALUE,
  payload: errorString,
});

export const changeZIPCodes = codesArray => ({
  type: CHANGE_CODES_VALUES,
  payload: codesArray,
});

export const changeCurrentItem = currentItemObject => ({
  type: CHANGE_CURRENT_ITEM,
  payload: currentItemObject,
});

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const itemsFetchedSuccess = (isFetching, searchError, zipCodeItems) => ({
  type: ITEM_FETCHED_SUCCESS,
  payload: {
    isFetching,
    searchError,
    searchValue: '',
    zipCodeItems,
  },
});

export const itemsFetchedError = (isFetching, searchError) => ({
  type: ITEM_FETCHED_ERROR,
  payload: {
    isFetching,
    searchError,
  },
});

// we can have dispatch and getState with using redux-thunk
// export const fetchSearchResult = (objParams) => async (dispatch, getState) => {

export const getNewData = () => async (dispatch, getState) => {
  const {isFetching, zipCodeItems, searchValue, currentItem} = getState().itemReducer;
  // prevent fetching new data if user are fetching data now
  if (!isFetching) {
    // this.setState({isFetching: true});
    dispatch(changeFetchingState(true));
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.zippopotam.us/us/${searchValue}`,
      });

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
        dispatch(itemsFetchedSuccess(false, searchError, newData));
        // this.setState({
        //   isFetching: false,
        // searchValue: '',
        // searchError: searchError,
        // zipCodeItems: newData,
        // });
      } else {
        // this.setState({isFetching: false, searchError: 'Something wrong with connection!'});
        dispatch(itemsFetchedError(false, 'Something wrong with connection!'));
        // dispatch(changeFetchingState(false));
        // dispatch(changeErrorValue('Something wrong with connection!'));
      }
    } catch (er) {
      console.log(er.response || er);
      let searchError = '';
      if (er.response && er.response.data && er.response.data['post code'] === undefined) {
        searchError = "Post code wasn't found";
      }
      dispatch(itemsFetchedError(false, searchError));
      // dispatch(changeFetchingState(false));
      // dispatch(changeErrorValue(searchError));
      // this.setState({isFetching: false, searchError});
    }
  }
};

// SAGAS API:
// https://github.com/redux-saga/redux-saga/tree/master/docs/api#saga-helpers

// it describes: call, put, take, takeLatest, select state, fire parallel fetching,
// https://medium.freecodecamp.org/async-operations-using-redux-saga-2ba02ae077b3