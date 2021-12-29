import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

import InfoBox from '../Info/InfoBox';
import Banner from '../Generic/Banner';

import informations from '../../data/mockedData';

const HomeInfo = () => {
  const LinkElement = (
    <Text style={[styles.text, styles.link]}>Zaloguj się</Text>
  );
  const AdditionalInfoElement = (
    <Text style={styles.text}>Email: Przyklad@gmail.com</Text>
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
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default HomeInfo;
