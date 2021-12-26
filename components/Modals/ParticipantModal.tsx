import React, { useEffect } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

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
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.header}>{user.username}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.closeButton, styles.button]}
          onPress={() => {}}
        >
          <Text style={styles.text}>Wyświetl Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.closeButton, styles.button]}
          onPress={() => {}}
        >
          <Text style={styles.text}>Dodaj do znajomych</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => closeModal(false)}
      >
        <Text style={styles.text}>Zamknij</Text>
      </TouchableOpacity>
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
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    marginTop: 0,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: 'dodgerblue',
    marginTop: 'auto',
    padding: 20,
    borderRadius: 50,
  },
});

export default ParticipantModal;
