import React from 'react';

import { ActivityIndicator } from 'react-native-paper';

interface Props {
  size?: 'small' | 'large' | number;
  color?: string;
}

const CustomActivityIndicator: React.FC<Props> = ({
  size,
  color,
}) => {
  return (
    <ActivityIndicator
      animating={true}
      color={color ? color : '#2196f3'}
      size={size}
    />
  );
};

export default CustomActivityIndicator;
