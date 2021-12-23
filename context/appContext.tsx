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
}

interface Props {
  children: React.ReactNode;
}

const initialState = {
  events: {
    items: [],
    loading: false,
  },
};

export const AppContext = createContext({} as Context);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getInitialEvents = async () => {
    dispatch({ type: EventActions.SET_EVENTS_LOADING });
    const data = await ServerClient.getAllEvents();

    dispatch({ type: EventActions.GET_EVENTS, payload: data });
  };

  // This function is same as above but it would probably changed in the future
  const reloadEvents = async () => {
    dispatch({ type: EventActions.SET_EVENTS_LOADING });
    const data = await ServerClient.getAllEvents();

    dispatch({ type: EventActions.GET_EVENTS, payload: data });
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
