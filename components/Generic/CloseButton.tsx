import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  styles?: any;
}

const CloseButton: React.FC<Props> = ({ styles }) => {
  const navigation = useNavigation();
  const handlePress = () => navigation.goBack();

  return (
    <TouchableOpacity
      style={[privateStyles.container, styles]}
      onPress={handlePress}
    >
      <Text>
        <FontAwesomeIcon icon={faTimes} color="white" size={32} />
      </Text>
    </TouchableOpacity>
  );
};

const privateStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default CloseButton;
