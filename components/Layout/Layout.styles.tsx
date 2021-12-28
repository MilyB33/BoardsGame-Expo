import {
  View,
  StatusBar,
  Platform,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import styled from 'styled-components';

const AppContainer = styled(SafeAreaView)`
  position: relative;
  flex: 1;
  margin-top: ${Platform.OS === 'android'
    ? `${StatusBar.currentHeight}px`
    : 0};
  max-width: 100%;
`;

const CustomBackground = styled(ImageBackground)`
  height: 100%;
  width: 100%;
  justify-content: center;
  position: absolute;
`;

export { AppContainer, CustomBackground };
