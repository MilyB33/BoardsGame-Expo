import React from 'react';

import { ActivityIndicator } from 'react-native-paper';

interface Props {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: any;
}

const CustomActivityIndicator: React.FC<Props> = ({
  size,
  color,
  style,
}) => {
  return (
    <ActivityIndicator
      animating={true}
      color={color ? color : '#2196f3'}
      size={size || 'large'}
      style={style}
    />
  );
};

export default CustomActivityIndicator;
