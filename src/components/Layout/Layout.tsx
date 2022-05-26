import React, { FC, ReactNode } from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { OfflineNotice, View } from 'wrn-core';

export interface LayoutProps {
  statusBarStyle?: StatusBarStyle;
  Header: ReactNode;
}

const Layout: FC<LayoutProps> = ({ statusBarStyle = 'default', children, Header }) => {
  return (
    <View flex>
      {Header}
      <StatusBar barStyle={statusBarStyle} />
      <OfflineNotice />
      {children}
    </View>
  );
};

export default Layout;
