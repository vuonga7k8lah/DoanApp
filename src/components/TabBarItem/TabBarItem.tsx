import React, { memo, useCallback, useState } from 'react';
import { View, Text, Icons, ECartTotal, FeatherName } from 'wrn-core';
import { useSelector } from 'react-redux';
import configureApp from 'utils/constants/configureApp';
import { tabNavigatorSelector } from 'containers/AppContent/selectors';
import styles from './styles';

interface TabBarItemProps {
  iconName: FeatherName | '';
  focused: boolean;
  labelName?: string;
  path: string;
}

function TabBarItem({ iconName, labelName = '', focused, path }: TabBarItemProps) {
  const [cartTotal, setCartTotal] = useState(0);
  const tabNavigator = useSelector(tabNavigatorSelector);
  const { color, colorActive } = tabNavigator.data.settings;
  const styleColor = focused ? colorActive : color;

  const handleFetchCartTotalEnd = useCallback((cartTotal: number) => {
    setCartTotal(cartTotal);
  }, []);

  return (
    <>
      {configureApp.settings.bottomTabBarTopBorder && tabNavigator.data.tabs.length > 1 && (
        <View style={[styles.divider, { backgroundColor: styleColor }]} />
      )}
      <View style={styles.container}>
        {!!iconName && <Icons.Feather name={iconName} size={22} style={styles.icon} colorNative={styleColor} />}
        {!!labelName && (
          <Text numberOfLines={1} tachyons={'f7'} style={[styles.label, { color: styleColor }]}>
            {labelName}
          </Text>
        )}
        {!!cartTotal && path === '/cart' && (
          <View style={styles.badge} backgroundColor="danger">
            <Text type="small" colorNative="#fff">
              {cartTotal}
            </Text>
          </View>
        )}
      </View>
      {path === '/cart' && <ECartTotal cartUri={`${configureApp.api.baseUrl}${path}`} onFetchCartTotalEnd={handleFetchCartTotalEnd} />}
    </>
  );
}

export default memo(TabBarItem);
