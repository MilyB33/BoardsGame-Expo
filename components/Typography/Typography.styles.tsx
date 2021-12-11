import { Text } from 'react-native';

import styled from 'styled-components';
import { getColor } from '../../styles/utils';

interface Props {
  color?: string;
}

const Typography = styled(Text)<Props>`
  font-size: 16px;
  color: ${({ color }) =>
    color !== undefined ? getColor(color) : getColor('black')};
  text-align: center;
  line-height: 24px;
`;

const H1 = styled(Typography)`
  font-size: 32px;
`;

const H2 = styled(Typography)`
  font-size: 24px;
`;

const H3 = styled(Typography)`
  font-size: 20px;
`;

const H4 = styled(Typography)`
  font-size: 16px;
`;

const Link = styled(Typography)`
  text-decoration: underline;
  margin-top: 10px;
`;

export { Typography, Link, H1, H2, H3, H4 };
