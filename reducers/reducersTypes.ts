import { Event } from '../types/types';

export interface EventsState {
  items: Array<Event>;
  loading: boolean;
}

export interface AppState {
  events: EventsState;
}

export enum EventActions {
  GET_EVENTS = 'GET_EVENTS',
  SET_EVENTS_LOADING = 'SET_EVENTS_LOADING',
  SIGN_USER_TO_EVENT = 'SIGN_USER_TO_EVENT',
  SIGN_OUT_USER_FROM_EVENT = 'SIGN_OUT_USER_FROM_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
  REPLACE_EDITED_EVENT = 'REPLACE_EDITED_EVENT',
}

export interface GetEventsAction {
  type: EventActions.GET_EVENTS;
  payload: Array<Event>;
}

export interface SetEventsLoadingAction {
  type: EventActions.SET_EVENTS_LOADING;
}

export interface UserActionEvent<T> {
  type: T;
  payload: {
    eventId: string;
    userId: string;
  };
}

export type AppAllActions =
  | GetEventsAction
  | SetEventsLoadingAction
  | UserActionEvent<EventActions.SIGN_USER_TO_EVENT>
  | UserActionEvent<EventActions.SIGN_OUT_USER_FROM_EVENT>
  | DeleteEventAction
  | EditEventAction;

// ========================================================

export interface UserState {
  id: string;
  username: string;
  isAuthenticated: boolean;
  loading: boolean;
  userEvents: Event[];
  userSignedEvents: Event[];
}

export enum UserActions {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_CURRENT_USER_LOADING = 'SET_CURRENT_USER_LOADING',
  END_CURRENT_USER_LOADING = 'END_CURRENT_USER_LOADING',
  LOGOUT_USER = 'LOGOUT_USER',
  SET_USER_EVENTS = 'SET_USER_EVENTS',
  DELETE_EVENT = 'DELETE_EVENT',
  EDIT_EVENT = 'EDIT_EVENT',
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

export type UserAllActions =
  | SetCurrentUserAction
  | OnlyTypeAction<UserActions.SET_CURRENT_USER_LOADING>
  | OnlyTypeAction<UserActions.END_CURRENT_USER_LOADING>
  | OnlyTypeAction<UserActions.LOGOUT_USER>
  | GetUserEventsAction
  | DeleteEventAction
  | EditEventAction;

// ========================================================

export interface DeleteEventAction {
  type: EventActions.DELETE_EVENT | UserActions.DELETE_EVENT;
  payload: {
    eventId: string;
    field?: string;
  };
}

export interface EditEventAction {
  type: EventActions.REPLACE_EDITED_EVENT | UserActions.EDIT_EVENT;
  payload: {
    event: Event;
    field?: string;
  };
}
