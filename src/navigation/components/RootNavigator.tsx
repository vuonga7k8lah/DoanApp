import React, { memo, FC } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import handleTabNavigator from 'navigation/functions/handleTabNavigator';
import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';
import TabBarItem from 'components/TabBarItem/TabBarItem';
import tabNavigatorOptions from 'navigation/functions/tabNavigatorOptions';
import { NavigationScreenProp } from 'navigation/types/NavigationScreenProp';
import { TabNavigator } from 'models/TabNavigator';
import { Platform } from 'react-native';

type RootStackNavigatorsKey = keyof typeof rootStackNavigators;

type HandleStackNavigatorsReturnType = {
  [K in RootStackNavigatorsKey]: {
    screen: ValueOf<typeof rootStackNavigators>;
    navigationOptions: NavigationStackOptions;
  };
};

export interface RootNavigatorProps {
  tabNavigator: TabNavigator['data'];
}

const isAndroid = Platform.OS === 'android';

const RootNavigator: FC<RootNavigatorProps> = ({ tabNavigator }) => {
  // biến đổi rootStackNavigators và gán thêm gestureResponseDistance 500
  const handleStackNavigators = () => {
    return Object.entries(rootStackNavigators).reduce<HandleStackNavigatorsReturnType>((acc, [key, value]) => {
      return {
        ...acc,
        [key]: {
          screen: value,
          navigationOptions: () => ({
            gesturesEnabled: true,
            gestureResponseDistance: {
              horizontal: key.includes('NotGetureDistance') ? 0 : 500,
            },
          }),
        },
      };
    }, {} as any);
  };

  const createRootTabNavigatorRoutes = () => {
    return handleTabNavigator(tabNavigator.tabs, rootTabNavigators, ({ tabBarLabel, iconName, path }) => ({
      tabBarLabel,
      tabBarIcon: ({ focused }) => {
        return <TabBarItem focused={focused} iconName={iconName} path={path} labelName={tabBarLabel} />;
      },
      tabBarOnPress: (scene: { navigation: NavigationScreenProp; defaultHandler: () => {} }) => {
        if (scene.navigation.isFocused()) {
          const stackNavigation = scene.navigation.state.routes[0];
          if (!!stackNavigation && !!stackNavigation.params && !!stackNavigation.params.onScrollToTop) {
            stackNavigation.params.onScrollToTop();
          }
        } else {
          scene.defaultHandler();
        }
      },
    }));
  };

  const rootTabNavigatorValue = () => {
    return createBottomTabNavigator(createRootTabNavigatorRoutes(), {
      ...tabNavigatorOptions,
      tabBarOptions: {
        ...tabNavigatorOptions.tabBarOptions,
        style: {
          backgroundColor: tabNavigator.settings.backgroundColor,
          borderTopWidth: 0,
        },
      },
    });
  };

  const RootStack = createStackNavigator(
    {
      RootTabNavigator: rootTabNavigatorValue(),
      ...(handleStackNavigators() as any),
    },
    {
      headerMode: 'none',
      ...(isAndroid ? { transitionConfig: getSlideFromRightTransition } : {}),
    },
  );
  const CreateRootStack = createAppContainer(RootStack);
  return <CreateRootStack />;
};

export default memo(RootNavigator);
