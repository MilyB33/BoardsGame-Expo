import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import Participant from './Participant';

interface Props {
  users: {
    username: string;
    _id: string;
  }[];
  changeView: React.Dispatch<React.SetStateAction<boolean>>;
}

const Participants: React.FC<Props> = ({ users, changeView }) => {
  const renderParticipants = () =>
    users.map((user) => <Participant key={user._id} user={user} />);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text, styles.header]}>Uczestnicy:</Text>
        <TouchableOpacity
          style={[styles.icon, styles.backIcon]}
          onPress={() => changeView(false)}
        >
          <FontAwesomeIcon
            icon={faHandPointLeft}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView>{renderParticipants()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    maxHeight: 200,
  },
  text: {
    color: 'white',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  },

  icon: {
    backgroundColor: 'dodgerblue',
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 50,
  },
  backIcon: {
    marginRight: 0,
  },
});

export default Participants;
