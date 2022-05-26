import { StatusBarStyle } from 'react-native';
import { FeatherName } from 'wrn-core';

export interface HeaderNavigatorItem {
  type: 'icon' | 'logo' | 'text';
  id: string;
  label?: string;
  uri?: string;
  iconName?: FeatherName | '';
  enable: boolean;
  path: string;
}

export interface HeaderNavigator {
  data: {
    settings: {
      backgroundColor: string;
      color: string;
      statusBarStyle: StatusBarStyle;
    };
    left?: HeaderNavigatorItem[];
    center?: HeaderNavigatorItem[];
    right?: HeaderNavigatorItem[];
  };
}
