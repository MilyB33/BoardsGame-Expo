import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Events: undefined;
  UserModal: undefined;
  UserEvents: undefined;
  AddEvent: undefined;
  EditEvent: { event: Event };
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  | 'Home'
  | 'Events'
  | 'UserModal'
  | 'UserEvents'
  | 'AddEvent'
  | 'EditEvent'
>;

export interface Event {
  date: string;
  time: string;
  game: string;
  description: string;
  location: string;
  town: string;
  createdAt: string;
  createdBy: {
    _id: string;
    username: string;
  };
  _id: string;
  maxPlayers: number;
  signedUsers: {
    _id: string;
    username: string;
  }[];
}

export interface EventPayload {
  date: string;
  time: string;
  game: string;
  description: string;
  location: string;
  town: string;
  maxPlayers: number;
}
