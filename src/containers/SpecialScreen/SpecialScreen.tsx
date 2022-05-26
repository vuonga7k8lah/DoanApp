import React from 'react';
import { ScreenFC } from 'navigation';
import Header, { HeaderType } from 'containers/Header/Header';
import { useSelector } from 'react-redux';
import configureApp from 'utils/constants/configureApp';
import { MagicContent } from 'wrn-core';
import useScrollTop from './useScrollTop';
import useSearch from './useSearch';
import { getUrl, isSearch } from './utils';

export interface SpecialScreenParams {
  url: string;
}

const SpecialScreen: ScreenFC<SpecialScreenParams> = ({ navigation }) => {
  const { isScrollTop, onScroll } = useScrollTop(navigation);
  const { value, onSearch } = useSearch();
  const tabNavigator = useSelector((state: AppState) => state.tabNavigator);
  const { url } = navigation.state.params || {};
  const parentRouteName = navigation.dangerouslyGetParent()?.state.routeName;
  const path = tabNavigator.data.tabs.find(item => item.id === parentRouteName)?.path || '';
  const _url = getUrl(url, path, value);
  const type: HeaderType = isSearch(_url) ? 'search' : 'default';

  return (
    <>
      <Header type={type} backButtonEnabled={!!url} onSearch={onSearch} />
      <MagicContent
        url={_url}
        baseUrl={configureApp.api.baseUrl}
        screenName="SpecialScreen"
        startInLoadingState
        isScrollTop={isScrollTop}
        onScroll={onScroll}
        css={`
          .wil-header-01__top + div {
            display: none !important;
          }
        `}
      />
    </>
  );
};

export default SpecialScreen;
