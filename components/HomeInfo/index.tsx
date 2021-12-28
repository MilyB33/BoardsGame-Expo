import React from 'react';
import { View, StyleSheet } from 'react-native';

import InfoBox from '../Info/InfoBox';
import { Link, Typography } from '../Typography/Typography.styles';
import Banner from '../Generic/Banner';

import informations from '../../data/mockedData';

const HomeInfo = () => {
  const LinkElement = <Link>Zaloguj się</Link>;
  const AdditionalInfoElement = (
    <Typography>Email: Przyklad@gmail.com</Typography>
  );

  return (
    <View style={styles.container}>
      <Banner />
      <InfoBox text={informations[0].text} />
      <InfoBox text={informations[1].text} link={LinkElement} />

      <InfoBox
        text={informations[2].text}
        additional={AdditionalInfoElement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeInfo;
