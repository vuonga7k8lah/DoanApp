import React, { PureComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ThemeConsumer, Styled, View } from 'wrn-core';
import styles from './styles';

export interface SkeletonProps {
  image: boolean;
  content: boolean;
  imagePercentRatio: string;
  imageRounded: boolean;
  type: 'vertical' | 'horizontal';
  imageSizeForTypeHorizontal: number;
  containerStyle: StyleProp<ViewStyle>;
}

export default class Skeleton extends PureComponent<SkeletonProps> {
  static defaultProps: SkeletonProps = {
    image: false,
    content: false,
    imagePercentRatio: '56.25%',
    type: 'vertical',
    imageSizeForTypeHorizontal: 70,
    containerStyle: {},
    imageRounded: false,
  };

  _renderImage = (styled: Styled) => {
    const { imagePercentRatio, type, imageSizeForTypeHorizontal, imageRounded } = this.props;
    return (
      <View
        style={[
          styled.bgGray2,
          imageRounded ? styles.borderRadius : {},
          type === 'vertical'
            ? {
                paddingTop: imagePercentRatio,
              }
            : {
                width: imageSizeForTypeHorizontal,
                height: imageSizeForTypeHorizontal,
              },
          ,
        ]}
      ></View>
    );
  };

  _renderContent = () => {
    const { type } = this.props;
    return (
      <View tachyons="mt2" style={styles[`${type}Content`]}>
        <View backgroundColor="gray2" tachyons="w80" style={styles.content}></View>
        <View backgroundColor="gray2" tachyons="w60" style={styles.content}></View>
        <View backgroundColor="gray2" tachyons="w40" style={styles.content}></View>
      </View>
    );
  };

  render() {
    const { image, content, type, containerStyle } = this.props;

    return (
      <View style={containerStyle}>
        <ThemeConsumer>
          {({ styled }) => (
            <View style={styles[`${type}Container`]}>
              {image && this._renderImage(styled)}
              {content && this._renderContent()}
            </View>
          )}
        </ThemeConsumer>
      </View>
    );
  }
}
