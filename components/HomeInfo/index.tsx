import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import InfoBox from '../Info/InfoBox';
import { Link, Typography } from '../Typography/Typography.styles';

import informations from '../../data/mockedData';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;

const HomeInfo = () => {
  const LinkElement = <Link>Zaloguj się</Link>;
  const AdditionalInfoElement = (
    <Typography>Email: Przyklad@gmail.com</Typography>
  );

  return (
    <Container>
      <InfoBox text={informations[0].text} />
      <InfoBox text={informations[1].text} link={LinkElement} />

      <InfoBox
        text={informations[2].text}
        additional={AdditionalInfoElement}
      />
    </Container>
  );
};

export default HomeInfo;
