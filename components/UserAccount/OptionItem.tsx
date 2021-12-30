import React from 'react';

import { StyleSheet } from 'react-native';
import { Surface, Button } from 'react-native-paper';

interface Props {
  title: string;
  icon: string;
  onPress: () => void;
  buttonColor?: any;
}

const OptionItem: React.FC<Props> = ({
  title,
  icon,
  onPress,
  buttonColor,
  ...rest
}) => {
  return (
    <Surface style={[styles.container]} {...rest}>
      <Button
        mode="contained"
        onPress={onPress}
        icon={icon ? icon : ''}
        style={[
          styles.button,
          { backgroundColor: buttonColor || 'dodgerblue' },
        ]}
      >
        {title}
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    padding: 5,
  },
});

export default OptionItem;
