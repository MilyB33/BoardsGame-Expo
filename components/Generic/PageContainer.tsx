import React from 'react';

import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => (
  <View>{children}</View>
);

export default PageContainer;
