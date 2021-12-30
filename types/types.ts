import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Events: undefined;
  UserModal: undefined;
  UserEvents: undefined;
  AddEvent: undefined;
  UserAccount: undefined;
  EditEvent: { event: Event };
};
export type Roots = keyof RootStackParamList;

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  Roots
>;

export type RouteProps = RouteProp<RootStackParamList, 'EditEvent'>; // Probably not needed

// ========================================================

// Events

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

// ========================================================

// Custom Input Props

type KeboardType = 'default' | 'numeric' | 'phone-pad' | 'number-pad';

export interface CustomInputProps {
  label?: string;
  placeholder: string;
  isSecure?: boolean;
  keyboardType?: KeboardType;
  isNumeric?: boolean;
  setFieldValue: (
    field: string,
    value: string | number,
    validation: boolean
  ) => void;
  field: {
    name: string;
    onBlur: Function;
    onChange: Function;
    value: string | number;
  };
  form: {
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    setFieldTouched: Function;
  };
}

// ========================================================

// Event Form Props

export interface EventFormState {
  location: string;
  description: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  time: {
    hour: number;
    minute: number;
  };
  game: string;
  town: string;
  maxPlayers: number;
}

// ========================================================

// Client

export interface LoginCredentials {
  username: string;
  password: string;
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
  post(endpoint: string, options?: OptionsWithBody): Promise<any>;
  get(endpoint: string, options?: Options): Promise<any>;
  delete(endpoint: string, options?: Options): Promise<any>;
  patch(endpoint: string, options?: OptionsWithBody): Promise<any>;
  defaultHeaders: Header;
  headers: Headers;
  returnHeaders(method: string): Header;
}

// ========================================================

// Additionals

export type KeyboardType =
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'number-pad';

export type DispatchType<T> = React.Dispatch<React.SetStateAction<T>>;
