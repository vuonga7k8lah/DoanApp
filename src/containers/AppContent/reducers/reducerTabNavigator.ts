import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { TabNavigator } from 'models/TabNavigator';
import { getTabNavigator } from '../actions/actionTabNavigator';

type TabNavigatorAction = ActionTypes<typeof getTabNavigator>;

export interface TabNavigatorState {
  status: Status;
  data: TabNavigator['data'];
  message: string;
}

const initialState: TabNavigatorState = {
  status: 'idle',
  data: {
    settings: {
      backgroundColor: '#fff',
      color: '#000',
      colorActive: '#000',
    },
    tabs: [],
  },
  message: '',
};

export const reducerTabNavigator = createReducer<TabNavigatorState, TabNavigatorAction>(
  initialState,
  handleAsyncAction(['@getTabNavigatorRequest', '@getTabNavigatorSuccess', '@getTabNavigatorFailure']),
);
