import React from 'react';
import { View } from 'react-native';

import InfoBox from '../Info/InfoBox';
import { Link, Typography } from '../Typography/Typography.styles';

import informations from '../../data/mockedData';

const HomeInfo = () => {
  const LinkElement = <Link color="white">Zaloguj się</Link>;
  const AdditionalInfoElement = (
    <Typography color="white">Email: Przyklad@gmail.com</Typography>
  );

  return (
    <View>
      <InfoBox text={informations[0].text} />
      <InfoBox text={informations[1].text} link={LinkElement} />

      <InfoBox
        text={informations[2].text}
        additional={AdditionalInfoElement}
      />
    </View>
  );
};

export default HomeInfo;
