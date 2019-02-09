import {CHANGE_WINDOW_SIZE} from '../../action-variables/index';

const initState = {value: 1200};

export default (state = initState, action) => {
  switch (action.type) {
    case CHANGE_WINDOW_SIZE:
      // Log.info('Size screen: ' + state.value);
      return {...state, value: action.payload};
    default:
      return state;
  }
};

export const changeWindowSize = size => ({type: CHANGE_WINDOW_SIZE, payload: size});
