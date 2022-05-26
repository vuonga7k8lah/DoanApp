import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { TabNavigator } from 'models/TabNavigator';

export const getTabNavigator = createAsyncAction(['@getTabNavigatorRequest', '@getTabNavigatorSuccess', '@getTabNavigatorFailure'])<
  {
    endpoint: string;
  },
  TabNavigator['data'],
  string
>();

export const useGetTabNavigator = createDispatchAsyncAction(getTabNavigator);
