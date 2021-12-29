import React, { useEffect } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Paragraph, Avatar } from 'react-native-paper';

interface Props {
  user: {
    username: string;
    _id: string;
  };
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParticipantModal: React.FC<Props> = ({ user, closeModal }) => {
  useEffect(() => {
    console.log('modal');
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Text
          size={100}
          label={user.username}
          labelStyle={{ fontSize: 32 }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          style={[styles.button]}
          mode="contained"
          onPress={() => {}}
        >
          Wyświetl Profil
        </Button>

        <Button
          style={[styles.button]}
          mode="contained"
          onPress={() => {}}
        >
          Dodaj do znajomych
        </Button>
      </View>

      <Button
        style={[styles.button, styles.closeButton]}
        onPress={() => closeModal(false)}
      >
        <Paragraph style={styles.text}>Zamknij</Paragraph>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'dodgerblue',
    marginTop: 0,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 'auto',
  },
});

export default ParticipantModal;
