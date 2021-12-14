import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from '../reducers/appReducer';
import ServerClient from '../clients/serverClient';
import { EventActions, AppState } from '../reducers/reducersTypes';

interface Context {
  state: AppState;
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

  useEffect(() => {
    getInitialEvents();
  }, []);

  return (
    <AppContext.Provider value={{ state }}>
      {children}
    </AppContext.Provider>
  );
};
