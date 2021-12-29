import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import Participant from './Participant';
import { IconButton } from 'react-native-paper';

import { DispatchType } from '../../types/types';

interface Props {
  users: {
    username: string;
    _id: string;
  }[];
  changeView: DispatchType<boolean>;
}

const Participants: React.FC<Props> = ({ users, changeView }) => {
  const [isClosed, setIsClosed] = useState(false);

  const renderParticipants = () =>
    users.map((user) => <Participant key={user._id} user={user} />);

  const usersLength = users.length > 2;

  const MoreButton = (
    <View style={styles.moreButton}>
      <IconButton
        icon={isClosed ? 'chevron-down' : 'chevron-up'}
        animated={true}
        color="white"
        onPress={() => setIsClosed(!isClosed)}
      />
    </View>
  );

  const renderParticipantsList = isClosed
    ? renderParticipants()
    : renderParticipants().slice(0, 2);

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
      <View>
        {usersLength ? (
          <>
            {renderParticipantsList}
            {MoreButton}
          </>
        ) : (
          renderParticipants()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  moreButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
  },
});

export default Participants;
