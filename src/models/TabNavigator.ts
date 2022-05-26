import { FeatherName } from 'wrn-core';

export interface TabNavigatorItem {
  id: string;
  label: string;
  iconColor: string;
  iconName: FeatherName | '';
  enable: boolean;
  path: string;
}

export interface TabNavigator {
  status: string;
  data: {
    settings: {
      backgroundColor: string;
      color: string;
      colorActive: string;
    };
    tabs: TabNavigatorItem[];
  };
}
