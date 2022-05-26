import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';
import AppLoading from 'expo-app-loading';
import { store, persistor } from './store/configureStore';
import AppContent from './containers/AppContent/AppContent';

interface AppProps {
  skipLoadingScreen: boolean;
}

export default function App(props: AppProps) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return <AppLoading startAsync={loadResourcesAsync} onError={handleLoadingError} onFinish={() => handleFinishLoading(setLoadingComplete)} />;
  }
  return (
    <PersistGate loading={<AppLoading />} persistor={persistor}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </PersistGate>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    // Asset.loadAsync([]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      ...FontAwesome.font,
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete: (input: boolean) => void) {
  setLoadingComplete(true);
}
if (!__DEV__) {
  enableScreens();
}
// if (__DEV__) {
//   // @ts-ignore
//   global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest;
//   // @ts-ignore
//   global.FormData = global.originalFormData ? global.originalFormData : global.FormData;

//   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//   fetch; // Ensure to get the lazy property

//   // @ts-ignore
//   if (window.__FETCH_SUPPORT__) {
//     // it's RNDebugger only to have
//     // @ts-ignore
//     window.__FETCH_SUPPORT__.blob = false;
//   } else {
//     /*
//      * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
//      * If you're using another way you can just use the native Blob and remove the `else` statement
//      */
//     // @ts-ignore
//     global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
//     // @ts-ignore
//     global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader;
//   }
// }
