import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from '../reducers/appReducer';
import ServerClient from '../clients/serverClient';
import { EventActions, AppState } from '../reducers/reducersTypes';
import { Event } from '../types/types';

interface Context {
  state: AppState;
  signUserForEvent(eventId: string, userId: string): void;
  signOutUserFromEvent(eventId: string, userId: string): void;
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

  const signUserForEvent = async (
    eventId: string,
    userId: string
  ) => {
    const data = await ServerClient.signUserForEvent(eventId, userId);

    if (!data.success) alert(data.message);

    dispatch({
      type: EventActions.SIGN_USER_TO_EVENT,
      payload: {
        eventId,
        userId,
      },
    });
  };

  const signOutUserFromEvent = async (
    eventId: string,
    userId: string
  ) => {
    const data = await ServerClient.signOutUserFromEvent(
      eventId,
      userId
    );

    if (!data.success) alert(data.message);

    dispatch({
      type: EventActions.SIGN_OUT_USER_FROM_EVENT,
      payload: {
        eventId,
        userId,
      },
    });
  };

  useEffect(() => {
    // Probably this use effect rerenders once but it must be checked
    if (state.events.items.length === 0) getInitialEvents();
  }, []);

  return (
    <AppContext.Provider
      value={{ state, signUserForEvent, signOutUserFromEvent }}
    >
      {children}
    </AppContext.Provider>
  );
};
