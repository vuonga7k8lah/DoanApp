import { ReactNode } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { TabNavigatorItem } from 'models/TabNavigator';
import { FeatherName } from 'wrn-core';

export interface RenderTabReturnType {
  tabBarLabel: string;
  tabBarIcon: ({ tintColor, focused }: { tintColor: string; focused: boolean }) => ReactNode;
}

export interface AccType {
  [key: string]: {
    screen: any;
    navigationOptions: RenderTabReturnType;
  };
}

export interface CheckScreen {
  [key: string]: any;
}

export type RenderTabItem = ({
  tabBarLabel,
  iconName,
  path,
}: {
  tabBarLabel: string;
  iconName: FeatherName | '';
  screen: string;
  path: string;
}) => RenderTabReturnType;

export default function handleTabNavigator(source: TabNavigatorItem[], checkScreen: CheckScreen, renderTabItem: RenderTabItem) {
  return source.reduce((acc: AccType, item: TabNavigatorItem) => {
    if (!item.enable || !checkScreen['SpecialNavigator']) {
      return acc;
    }
    const newValue = {
      screen: createStackNavigator(checkScreen['SpecialNavigator'], { headerMode: 'none' }),
      navigationOptions: renderTabItem({
        tabBarLabel: item.label,
        iconName: item.iconName,
        screen: 'SpecialNavigator',
        path: item.path,
      }),
    };
    return {
      ...acc,
      [item.id]: newValue,
    };
  }, {});
}
