import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ParticipantModal from '../Modals/ParticipantModal';

interface Props {
  user: {
    username: string;
    _id: string;
  };
}

const Participant: React.FC<Props> = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.participant}>
      <Text style={styles.text}>{user.username}</Text>

      <TouchableOpacity
        style={styles.icon}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesomeIcon icon={faUser} size={20} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ParticipantModal user={user} closeModal={setModalVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'dodgerblue',
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 50,
  },
  participant: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  text: {
    color: 'white',
  },
});

export default Participant;
