export interface Event {
  date: string;
  time: string;
  game: string;
  description: string;
  place: string;
  createdAt: string;
  createdBy: string;
  _id: string;
}

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
}

export interface GetEventsAction {
  type: EventActions.GET_EVENTS;
  payload: Array<Event>;
}

export interface SetEventsLoadingAction {
  type: EventActions.SET_EVENTS_LOADING;
}

export type AppAllActions = GetEventsAction | SetEventsLoadingAction;
