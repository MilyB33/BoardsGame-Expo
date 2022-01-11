import { Event, User } from '../types/types';

export interface EventsState {
  items: Array<Event>;
  loading: boolean;
  query: {
    offset: number;
    limit: number;
  };
}

export interface AppState {
  events: EventsState;
}

export enum EventActions {
  GET_EVENTS = 'GET_EVENTS',
  SET_EVENTS_LOADING = 'SET_EVENTS_LOADING',
  FILTER_OUT_EVENT = 'FILTER_OUT_EVENT',
  REPLACE_EVENT = 'REPLACE_EVENT',
  LOAD_EVENTS = 'LOAD_EVENTS',
  REFERESH_EVENTS = 'REFERESH_EVENTS',
}

export interface GetEventsAction {
  type:
    | EventActions.GET_EVENTS
    | EventActions.LOAD_EVENTS
    | EventActions.REFERESH_EVENTS;
  payload: Array<Event>;
}

export interface SetEventsLoadingAction {
  type: EventActions.SET_EVENTS_LOADING;
}

export type AppAllActions =
  | GetEventsAction
  | SetEventsLoadingAction
  | DeleteEventAction
  | EditEventAction;

// ========================================================

type EventsType = {
  [key: string | number]: {
    items: Event[];
    loading: boolean;
  };
};

export interface UserState {
  id: string;
  username: string;
  isAuthenticated: boolean;
  loading: boolean;
  events: EventsType;
  contacts: string[]; // TODO: change to array of contacts
  contactRequests: string[];
}

export enum UserActions {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_CURRENT_USER_LOADING = 'SET_CURRENT_USER_LOADING',
  END_CURRENT_USER_LOADING = 'END_CURRENT_USER_LOADING',
  LOGOUT_USER = 'LOGOUT_USER',
  SET_USER_EVENTS = 'SET_USER_EVENTS',
  SET_EVENTS_LOADING = 'SET_EVENTS_LOADING',
  DELETE_EVENT = 'DELETE_EVENT',
  EDIT_EVENT = 'EDIT_EVENT',
  SIGN_USER_TO_EVENT = 'SIGN_USER_TO_EVENT',
  SIGN_OUT_USER_FROM_EVENT = 'SIGN_OUT_USER_FROM_EVENT',
  ADD_EVENT = 'ADD_EVENT',
}

export interface SetCurrentUserAction {
  type: UserActions.SET_CURRENT_USER;
  payload: {
    id: string;
    username: string;
  };
}

export interface OnlyTypeAction<T> {
  type: T;
}

export interface GetUserEventsAction {
  type: UserActions.SET_USER_EVENTS;
  payload: {
    field: string;
    events: Event[];
  };
}

export interface SignUserToEventAction {
  type: UserActions.SIGN_USER_TO_EVENT;
  payload: Event;
}

export interface SignOutUserFromEventAction {
  type: UserActions.SIGN_OUT_USER_FROM_EVENT;
  payload: string;
}

export interface SetLoadingEvents {
  type: UserActions.SET_EVENTS_LOADING;
  payload: {
    field: string;
  };
}

export interface EventPayloadAction<T> {
  type: T;
  payload: Event;
}

export type UserAllActions =
  | SetCurrentUserAction
  | OnlyTypeAction<UserActions.SET_CURRENT_USER_LOADING>
  | OnlyTypeAction<UserActions.END_CURRENT_USER_LOADING>
  | OnlyTypeAction<UserActions.LOGOUT_USER>
  | SignUserToEventAction
  | SignOutUserFromEventAction
  | GetUserEventsAction
  | DeleteEventAction
  | EditEventAction
  | SetLoadingEvents
  | EventPayloadAction<UserActions.ADD_EVENT>;

// ========================================================

export interface ModalsState {
  [key: string]: boolean;
}

export enum ModalsActions {
  OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL',
  OPEN_REGISTER_MODAL = 'OPEN_REGISTER_MODAL',
  OPEN_ADD_EVENT_MODAL = 'OPEN_ADD_EVENT_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export interface ModalsAction<E> {
  type: E;
}

export type ModalsAllActions =
  | ModalsAction<ModalsActions.OPEN_LOGIN_MODAL>
  | ModalsAction<ModalsActions.CLOSE_MODAL>
  | ModalsAction<ModalsActions.OPEN_REGISTER_MODAL>
  | ModalsAction<ModalsActions.OPEN_ADD_EVENT_MODAL>;

// ========================================================

export interface ContactsState {
  users: {
    items: User[];
    loading: boolean;
  };
}

export enum ContactsActions {
  GET_USERS = 'GET_USERS',
  SET_USERS_LOADING = 'SET_USERS_LOADING',
}

export interface GetUsers {
  type: ContactsActions.GET_USERS;
  payload: User[];
}

export type ContactsAllActions =
  | GetUsers
  | ActionWithoutPayload<ContactsActions.SET_USERS_LOADING>;

// ========================================================

export interface DeleteEventAction {
  type: EventActions.FILTER_OUT_EVENT | UserActions.DELETE_EVENT;
  payload: {
    eventId: string;
    field?: string;
  };
}

export interface EditEventAction {
  type: EventActions.REPLACE_EVENT | UserActions.EDIT_EVENT;
  payload: {
    event: Event;
    field?: string;
  };
}

export interface ActionWithoutPayload<T> {
  type: T;
}
