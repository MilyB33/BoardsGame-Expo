import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Banner } from 'react-native-paper';

import { NavigationProps } from '../../types/types';

const CustomBanner = () => {
  const navigation = useNavigation<NavigationProps>();
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Banner
        visible={visible}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setVisible(false),
          },
        ]}
        icon="information"
        style={{ backgroundColor: '#00b894' }}
      >
        Hi there! This application is still in development. Please be
        patient and enjoy the experience. You know where to find me if
        you find any bugs or have any suggestions.
      </Banner>
    </>
  );
};

export default CustomBanner;
