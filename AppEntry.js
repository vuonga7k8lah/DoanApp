import React from 'react';
import { registerRootComponent, Logs } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import { LogBox } from 'react-native';

if (__DEV__) {
  const isRemoteDebuggingEnabled = typeof atob !== 'undefined';
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
  activateKeepAwake();
  const AppEntry = () => {
    const App = require('./src/App').default;
    return <App />;
  };
  console.disableYellowBox = true;
  LogBox.ignoreAllLogs(true);
  registerRootComponent(AppEntry);
} else {
  const App = require('./src/App').default;
  registerRootComponent(App);
}
