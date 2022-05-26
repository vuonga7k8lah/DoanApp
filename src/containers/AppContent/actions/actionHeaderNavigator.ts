import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { HeaderNavigator } from 'models/HeaderNavigator';

export const getHeaderNavigator = createAsyncAction(['@getHeaderNavigatorRequest', '@getHeaderNavigatorSuccess', '@getHeaderNavigatorFailure'])<
  {
    endpoint: string;
  },
  HeaderNavigator['data'],
  string
>();

export const useGetHeaderNavigator = createDispatchAsyncAction(getHeaderNavigator);
