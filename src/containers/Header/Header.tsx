import React, { FC, ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { OfflineNotice } from 'wrn-core';
import HeaderDefault from './HeaderDefault';
import HeaderSearch, { HeaderSearchProps } from './HeaderSearch';

export type HeaderType = 'default' | 'search';

export interface HeaderProps {
  type?: HeaderType;
  backButtonEnabled?: boolean;
  onSearch?: HeaderSearchProps['onSearch'];
}

const Header: FC<HeaderProps> = ({ type = 'default', backButtonEnabled = false, onSearch }) => {
  const { data } = useSelector((state: AppState) => state.headerNavigator);
  const { statusBarStyle } = data.settings;

  const headerMapping: Record<HeaderType, ReactNode> = {
    default: <HeaderDefault backButtonEnabled={backButtonEnabled} />,
    search: <HeaderSearch onSearch={onSearch} backButtonEnabled={backButtonEnabled} />,
  };

  return (
    <>
      {headerMapping[type]}
      <StatusBar barStyle={statusBarStyle} />
      <OfflineNotice />
    </>
  );
};

export default Header;
