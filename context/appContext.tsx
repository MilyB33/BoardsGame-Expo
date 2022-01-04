import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from '../reducers/appReducer';
import ServerClient from '../clients/serverClient';
import { EventActions, AppState } from '../reducers/reducersTypes';
import { Event } from '../types/types';

interface Context {
  state: AppState;
  FilterOutEvent(eventId: string): Promise<void>;
  replaceEvent(event: Event): Promise<void>;
  reloadEvents(): Promise<void>;
  loadEvents(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const initialState = {
  events: {
    items: [],
    loading: false,
    query: {
      offset: 0,
      limit: 3,
    },
  },
};

export const AppContext = createContext({} as Context);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getInitialEvents = async () => {
    const { offset, limit } = state.events.query;
    dispatch({ type: EventActions.SET_EVENTS_LOADING });

    const result = await ServerClient.getAllEvents(offset, limit);

    if (!result.success) return;

    dispatch({
      type: EventActions.GET_EVENTS,
      payload: result.result,
    });
  };

  // This function is same as above but it would probably changed in the future
  const reloadEvents = async () => {
    const { limit } = state.events.query;
    dispatch({ type: EventActions.SET_EVENTS_LOADING });

    const result = await ServerClient.getAllEvents(0, limit);

    if (!result.success) return;

    dispatch({
      type: EventActions.REFERESH_EVENTS,
      payload: result.result,
    });
  };

  const FilterOutEvent = async (eventId: string) => {
    dispatch({
      type: EventActions.FILTER_OUT_EVENT,
      payload: { eventId },
    });
  };

  const replaceEvent = async (event: Event) => {
    dispatch({
      type: EventActions.REPLACE_EVENT,
      payload: { event },
    });
  };

  const loadEvents = async () => {
    const { offset, limit } = state.events.query;

    dispatch({ type: EventActions.SET_EVENTS_LOADING });

    const result = await ServerClient.getAllEvents(offset, limit);

    if (!result.success) return;

    dispatch({
      type: EventActions.LOAD_EVENTS,
      payload: result.result,
    });
  };

  useEffect(() => {
    // Probably this use effect rerenders once but it must be checked
    if (state.events.items.length === 0) getInitialEvents();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        FilterOutEvent,
        replaceEvent,
        reloadEvents,
        loadEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
