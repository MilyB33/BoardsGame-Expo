import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Events: undefined;
  UserModal: undefined;
  UserEvents: undefined;
  AddEvent: undefined;
  UserAccount: undefined;
  Contacts: undefined;
  ChangePasswordModal: undefined;
  EditEvent: { event: Event };
};

export type Routes = keyof RootStackParamList;

export type FriendsStackParamList = {
  ContactsHome: undefined;
  SearchUser: undefined;
  UserEventsModal: { userId: string };
};

export type Friends = keyof FriendsStackParamList;

export type FriendsNavigationProps = NativeStackNavigationProp<
  FriendsStackParamList,
  Friends
>;

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  Routes
>;

export type RouteProps = RouteProp<RootStackParamList, "EditEvent">; // Probably not needed

// ========================================================

// Users

export interface UserEntry {
  _id: string;
  username: string;
}

export type Requests = {
  sent: UserEntry[];
  received: UserEntry[];
};

export type User = {
  _id: string;
  username: string;
  events?: {
    userEvents: Event[];
    userSignedEvents: Event[];
    userInvitedEvents: Event[];
  };
  friends?: UserEntry[];
  friendsRequests?: Requests;
  eventsRequests?: Requests; // TODO: this should be an object with eventIds as keys
};

// Events

export interface InviteEntry {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
}

export interface Event {
  _id: string;
  date: string;
  time: string;
  game: string;
  description: string;
  location: string;
  town: string;
  createdAt: string;
  createdBy: UserEntry;
  maxPlayers: number;
  signedUsers: UserEntry[];
  invites: InviteEntry[];
  inviteId?: string;
  invitedBy?: UserEntry;
  isPrivate: boolean;
}

export interface EventPayload {
  date: string;
  time: string;
  game: string;
  description: string;
  location: string;
  town: string;
  maxPlayers: number;
  isPrivate: boolean;
}

// ========================================================

// Custom Input Props

type KeboardType = "default" | "numeric" | "phone-pad" | "number-pad";

export interface DefaultProps<T = string> {
  label?: string;
  setFieldValue: (field: string, value: T, validation: boolean) => void;
  field: {
    name: string;
    onBlur: Function;
    onChange: Function;
    value: T;
  };
  form: {
    errors: { [key: string]: string };
    touched: { [key: string]: string };
    setFieldTouched: Function;
  };
}

export type CustomInputProps = DefaultProps<string | number> & {
  placeholder: string;
  isSecure?: boolean;
  keyboardType?: KeboardType;
  isNumeric?: boolean;
  multiline?: boolean;
};

export type CustomSwitchProps = DefaultProps<boolean>;

export type DateFieldProps = DefaultProps<Date> & {
  mode?: "date" | "time" | "datetime";
  buttonText?: string;
};

// ========================================================

// Form Types

// Event Form Props

export interface EventFormState {
  location: string;
  description: string;
  date: Date;
  time: Date;
  game: string;
  town: string;
  maxPlayers: number;
  isPrivate: boolean;
}

export interface LoginFormState {
  username: string;
  password: string;
}

export interface RegisterFormState {
  username: string;
  password: string;
  confirmPassword?: string; // TODO: Remove this
}

// ========================================================

// Client

export interface LoginCredentials {
  username: string | null;
  password: string | null;
}

export type Header = {
  [key: string]: string;
};

export type Headers = {
  [key: string]: Header;
};

export interface Options {
  headers?: Header;
}

type Body = {
  [key: string]: any;
};

export interface OptionsWithBody extends Options {
  body: Body | null;
}

export interface Client {
  BaseURL: string;
  post(endpoint: string, options?: OptionsWithBody): P<any>;
  get(endpoint: string, options?: Options): P<any>;
  delete(endpoint: string, options?: Options): P<any>;
  patch(endpoint: string, options?: OptionsWithBody): P<any>;
  defaultHeaders: Header;
  headers: Headers;
  returnHeaders(method: string): Header;
}

export type PaginationQuery = {
  offset?: number;
  limit?: number;
};

export type ExtendedQuery<T> = PaginationQuery &
  Partial<{
    [Key in keyof T]: T[Key];
  }>;

export type ReturnTypes = P<
  | {
      success: boolean;
      result: any;
    }
  | {
      success: boolean;
      message: unknown;
    }
>;

// ========================================================

// State - User

type EventsType = {
  [key: string | number]: Event[];
};

type EventsRequest = {
  sent: string[];
  received: string[];
};

export type LoadingType = "idle" | "loading" | "succeeded" | "failed";

export interface EventEntry {
  user: UserEntry;
  eventId: string;
}

export type UserStateTest = {
  _id: string;
  isAuthenticated: boolean;
  username: string;
  loading: LoadingType;
  events: EventsType;
  friends: UserEntry[];
  friendsRequests: Requests;
  eventsRequests: EventsRequest;
};

// state - App

export enum AppStateKeys {
  EVENTS = "events",
  USERS = "users",
}

export interface AppFieldState<T> {
  items: Array<T>;
  loading: boolean;
  query: {
    offset: number;
    limit: number;
  };
}

export interface AppFieldStateTest<T> {
  items: Array<T>;
  loading: LoadingType;
  query: {
    offset: number;
    limit: number;
  };
}

export interface AppStateTest {
  [AppStateKeys.EVENTS]: AppFieldStateTest<Event>;
  [AppStateKeys.USERS]: AppFieldStateTest<UserEntry>;
}

// ========================================================

// Additionals

export type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad";

export type DispatchType<T> = React.Dispatch<React.SetStateAction<T>>;

export type P<T = void> = Promise<T>; // Promise alias
