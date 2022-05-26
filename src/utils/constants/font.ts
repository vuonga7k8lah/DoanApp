import { Platform, TextStyle } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const fontWeightTitle: TextStyle = isIOS ? { fontWeight: '500' } : { fontFamily: 'sans-serif-medium', fontWeight: 'normal' };
export const fontWeightText: TextStyle = isIOS ? { fontWeight: '400' } : { fontFamily: 'sans-serif', fontWeight: 'normal' };
