import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { RootNavigator } from 'navigation';
import { ThemeProvider, View, useMount } from 'wrn-core';
import { useSelector } from 'react-redux';
import { tabNavigatorSelector } from 'containers/AppContent/selectors';
// import i18n from 'utils/functions/i18n';
// import ModalAppUpdate from 'components/ModalAppUpdate/ModalAppUpdate';
import StoreReview from 'components/StoreReview/StoreReview';
import { useGetTabNavigator } from './actions/actionTabNavigator';
import { useGetHeaderNavigator } from './actions/actionHeaderNavigator';

export default function AppContent() {
  const getTabNavigator = useGetTabNavigator();
  const getHeaderNavigator = useGetHeaderNavigator();
  const tabNavigator = useSelector(tabNavigatorSelector);

  useMount(() => {
    getTabNavigator.request({ endpoint: 'tab-navigators' });
    getHeaderNavigator.request({ endpoint: 'xxx' });
  });

  return (
    <>
      <StoreReview />
      <ThemeProvider>
        <ActionSheetProvider>
          <View flex>
            {/* <ModalAppUpdate
              text={configureApp.settings.applicationUpdateMessage}
              buttonUpdateText={i18n.t('updateNow')}
              moreText={i18n.t('seeMoreUpdateDetails')}
              nextVersion="1.1.2"
              simulator
            /> */}
            <RootNavigator tabNavigator={tabNavigator.data} />
          </View>
        </ActionSheetProvider>
      </ThemeProvider>
    </>
  );
}
