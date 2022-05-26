import React, { memo } from 'react';
import { TextInputProps } from 'react-native';
import BackButton from 'components/BackButton/BackButton';
import { HeaderBase, Input, Icons } from 'wrn-core';
import { useSelector } from 'react-redux';
import { styles } from './styles';

export interface HeaderSearchProps {
  backButtonEnabled: boolean;
  onSearch?: TextInputProps['onChangeText'];
}

function HeaderSearch({ backButtonEnabled = false, onSearch = () => {} }: HeaderSearchProps) {
  const { data } = useSelector((state: AppState) => state.headerNavigator);
  const { settings } = data;
  const { backgroundColor, color } = settings;

  const _handleChangeText: TextInputProps['onChangeText'] = value => {
    onSearch(value);
  };

  return (
    <HeaderBase
      backgroundColor={backgroundColor}
      Left={backButtonEnabled && <BackButton tachyons={['pa1', 'nl1', 'mr2']} color={color} />}
      Right={
        <Input
          placeholder="Search"
          placeholderTextColor={color}
          borderColor="transparent"
          clearButtonMode="while-editing"
          autoCorrect={false}
          Left={<Icons.Feather name="search" size={20} style={{ marginHorizontal: 10, color }} />}
          onChangeText={_handleChangeText}
          onClearText={_handleChangeText}
          inputStyle={{ color }}
          containerStyle={[backButtonEnabled ? styles.input : {}, { backgroundColor: 'rgba(0,0,0,0.2)', marginRight: 5 }]}
        />
      }
    />
  );
}

export default memo(HeaderSearch);
