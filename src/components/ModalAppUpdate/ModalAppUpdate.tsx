import React, { FC, memo, useState } from 'react';
import { Modal, Linking, Image as RNImage, TouchableOpacity as RNTouchableOpacity, Platform } from 'react-native';
import VersionCheck from 'utils/functions/CheckVersionExpo';
import { useMount, Button, View, Text, withViewStyles, Icons } from 'wrn-core';

export interface ModalAppUpdateProps {
  text: string;
  buttonUpdateText: string;
  moreText: string;
  nextVersion: string;
  simulator?: boolean;
}

const isIOS = Platform.OS === 'ios';
const Image = withViewStyles(RNImage);
const TouchableOpacity = withViewStyles(RNTouchableOpacity);

const ModalAppUpdate: FC<ModalAppUpdateProps> = ({ text, buttonUpdateText, moreText, nextVersion, simulator = false }) => {
  const [visible, setVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const appName = '';
  const version = '';
  // const { name: appName, version } = Constants.manifest;
  const versionToNumber = (version: string) => Number(version.replace(/\./g, ''));

  const handleNeedUpdate = async () => {
    if (!!version && versionToNumber(nextVersion) > versionToNumber(version)) {
      const res = await VersionCheck.needUpdate({ ignoreErrors: true });
      setVisible(true);
      setStoreUrl(res.storeUrl);
    }
  };

  const handleUpdate = () => {
    Linking.openURL(storeUrl);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useMount(() => {
    if (!__DEV__ || simulator) {
      handleNeedUpdate();
    }
  });

  return (
    <Modal visible={visible} animationType="slide">
      <View tachyons={['flex', 'relative']} safeAreaView>
        <View alignItems="flex-end" tachyons={['ph3', 'pv1']}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
            {/* <IconBox name="x" backgroundColor="dark1" color="light" /> */}
          </TouchableOpacity>
        </View>
        <View tachyons={['flex', 'justifyCenter', 'pa3']} backgroundColor="light">
          <View tachyons={['itemsCenter']}>
            <Text type="h3" tachyons="mb3" color="primary">
              {appName} {nextVersion}
            </Text>
            <Text tachyons="tc">{text}</Text>
          </View>
          <Image source={require('assets/vectors/update-light.jpg')} tachyons={['w100', 'h50']} resizeMode="contain" />
          <Button block size="medium" borderRadius="round" onPress={handleUpdate}>
            <View tachyons="mr2">
              <Icons.FontAwesome5 name={isIOS ? 'apple' : 'android'} size={18} colorNative="#fff" />
            </View>
            <Text colorNative="#fff">{buttonUpdateText}</Text>
          </Button>
          <TouchableOpacity activeOpacity={0.8} onPress={handleUpdate} tachyons="pa3">
            <Text color="dark2" tachyons="tc">
              {moreText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalAppUpdate);
