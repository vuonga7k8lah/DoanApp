import React, { memo, FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Link, LinkProps } from 'navigation';
import { Icons, Text, useTheme } from 'wrn-core';
import styles from './styles';

interface BackButtonProps extends LinkProps<any> {
  backText?: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onAfterBack?: () => void;
}

const BackButton: FC<BackButtonProps> = ({ backText = '', color = '#111', containerStyle = {}, onAfterBack, ...rest }) => {
  const { sizes } = useTheme();
  return (
    <Link {...rest} to="../" activeOpacity={0.7} style={[styles.container, containerStyle]} onAfterNavigate={onAfterBack}>
      <Icons.Feather name="chevron-left" size={sizes.base * 1.8} style={{ color }} />
      {!!backText && (
        <Text tachyons="f6" style={{ color }}>
          {backText}
        </Text>
      )}
    </Link>
  );
};

export default memo(BackButton);
