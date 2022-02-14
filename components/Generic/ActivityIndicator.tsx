import React from "react";

import { ActivityIndicator } from "react-native-paper";

interface PropTypes {
  size?: "small" | "large" | number;
  color?: string;
  style?: any;
}

const CustomActivityIndicator = ({ size, color, style }: PropTypes) => {
  return (
    <ActivityIndicator
      animating={true}
      color={color ? color : "#2196f3"}
      size={size || "large"}
      style={style}
    />
  );
};

export default CustomActivityIndicator;
