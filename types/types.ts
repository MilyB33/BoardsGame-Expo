export type RootStackParamList = {
  Home: undefined;
  Events: undefined;
  Modal: undefined;
  UserEvents: undefined;
};

export interface Event {
  date: string;
  time: string;
  game: string;
  description: string;
  location: string;
  town: string;
  createdAt: string;
  createdBy: string;
  _id: string;
  maxPlayers: number;
  signedUsers: string[];
}
