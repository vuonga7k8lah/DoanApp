import BackButton from 'components/BackButton/BackButton';
import React, { FC, memo, ReactNode } from 'react';
import { withNavigation } from 'react-navigation';
import { HeaderBase, Icons, View, FeatherName, Text } from 'wrn-core';
import { sizeBase } from 'utils/constants/base';
import { Link } from 'navigation';
import { useSelector } from 'react-redux';
import { HeaderNavigatorItem } from 'models/HeaderNavigator';
import configureApp from 'utils/constants/configureApp';
import { Image } from 'react-native';
import { WebView } from 'react-native-webview';

export interface HeaderDefaultProps {
  backButtonEnabled?: boolean;
}

const HeaderDefault: FC<HeaderDefaultProps> = ({ backButtonEnabled = false }) => {
  const { data } = useSelector((state: AppState) => state.headerNavigator);
  const { settings, left, center, right } = data;
  const { backgroundColor, color } = settings;

  const renderItemMapping = (item: HeaderNavigatorItem): Record<HeaderNavigatorItem['type'], ReactNode> => {
    return {
      logo: (
        <View key={item.id}>
          {item.uri?.includes('.svg') ? (
            <WebView
              source={{
                html: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><img src="${item.uri}" style="width: 100%; height: 100%; object-fit: contain;" /></body></html>`,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ width: 150, height: 40 }}
            />
          ) : (
            <Image source={{ uri: item.uri as string }} style={{ width: 150, height: 40 }} resizeMode="contain" />
          )}
        </View>
      ),
      text: (
        <View key={item.id}>
          <Text type="h3" style={{ color }}>
            {item.label}
          </Text>
        </View>
      ),
      icon: (
        <View key={item.id} tachyons="mh1">
          <Link
            push="SpecialScreen"
            params={{ url: `${configureApp.api.baseUrl}${item.path}`, backButtonEnabled: true }}
            activeOpacity={0.7}
            tachyons="pa1"
          >
            <Icons.Feather name={item.iconName as FeatherName} size={sizeBase * 1.5} style={{ color }} />
          </Link>
        </View>
      ),
    };
  };

  const renderItem = (item: HeaderNavigatorItem) => {
    return renderItemMapping(item)[item.type];
  };

  const headerLeft = backButtonEnabled ? <BackButton key="item1" color={color} tachyons={['pa1', 'nl1', 'mr2']} /> : left?.map(renderItem);
  const headerRight = right?.map(renderItem);
  const headerCenter = center?.map(renderItem);

  return <HeaderBase backgroundColor={backgroundColor} Left={headerLeft} Right={headerRight} {...(center?.length ? { Center: headerCenter } : {})} />;
};

export default memo(withNavigation(HeaderDefault));
