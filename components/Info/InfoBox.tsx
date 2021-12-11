import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import { getColor } from '../../styles/utils';
import { Typography } from '../Typography/Typography.styles';

interface Props {
  text: string;
  link?: React.ReactNode;
  additional?: React.ReactNode;
}

const Box = styled(View)`
  margin: 15px auto;
  padding: 25px;
  border-radius: 10px;
  background-color: ${getColor('primary')};
  border: 1px solid ${getColor('primary-border')};
  max-width: 90%;
`;

const InfoBox: React.FC<Props> = ({ text, link, additional }) => {
  return (
    <Box>
      <Typography>{text}</Typography>
      {link}
      {additional}
    </Box>
  );
};

export default InfoBox;
