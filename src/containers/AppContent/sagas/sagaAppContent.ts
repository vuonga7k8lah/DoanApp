import { watchTabNavigator } from './watchTabNavigator';
import { watchHeaderNavigator } from './watchHeaderNavigator';

const sagaAppContent = [watchTabNavigator, watchHeaderNavigator];

export default sagaAppContent;
