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
  | UserActionEvent<EventActions.SIGN_OUT_USER_FROM_EVENT>;
