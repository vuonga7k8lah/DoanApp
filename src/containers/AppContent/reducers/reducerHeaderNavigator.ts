import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { HeaderNavigator } from 'models/HeaderNavigator';
import { getHeaderNavigator } from '../actions/actionHeaderNavigator';

type HeaderNavigatorAction = ActionTypes<typeof getHeaderNavigator>;

export interface HeaderNavigatorState {
  status: Status;
  data: HeaderNavigator['data'];
  message: string;
}

const initialState: HeaderNavigatorState = {
  status: 'idle',
  data: {
    settings: {
      backgroundColor: '#fff',
      color: '#000',
      statusBarStyle: 'dark-content',
    },
    left: [],
    center: [],
    right: [],
  },
  message: '',
};

export const reducerHeaderNavigator = createReducer<HeaderNavigatorState, HeaderNavigatorAction>(
  initialState,
  handleAsyncAction(['@getHeaderNavigatorRequest', '@getHeaderNavigatorSuccess', '@getHeaderNavigatorFailure']),
);
