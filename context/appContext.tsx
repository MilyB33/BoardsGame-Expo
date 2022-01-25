import React, { createContext, useReducer, useEffect } from "react";
import appReducer from "../reducers/appReducer";
import ServerClient from "../clients/serverClient";
import { EventActions, AppState } from "../reducers/reducersTypes";
import { Event, P } from "../types/types";

interface Context {
  state: AppState;
  FilterOutEvent(eventId: string): P;
  replaceEvent(event: Event): P;
  reloadEvents(): P;
  loadEvents(): P;
  deleteInvite(inviteID: string, eventID: string): void;
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
  users: {
    items: [],
    loading: false,
    query: {
      offset: 0,
      limit: 3,
    },
  },
} as AppState;

export const AppContext = createContext({} as Context);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getInitialEvents = async () => {
    const { query } = state.events;

    dispatch({
      type: EventActions.SET_EVENTS_LOADING,
    });

    const result = await ServerClient.getAllEvents(query);

    if (!result.success) return;

    dispatch({
      type: EventActions.GET_EVENTS,
      payload: result.result,
    });
  };

  // This function is same as above but it would probably changed in the future
  const reloadEvents = async () => {
    const { limit } = state.events.query;
    dispatch({
      type: EventActions.SET_EVENTS_LOADING,
    });

    const result = await ServerClient.getAllEvents({ offset: 0, limit });

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
    const { query } = state.events;

    dispatch({
      type: EventActions.SET_EVENTS_LOADING,
    });

    const result = await ServerClient.getAllEvents(query);

    if (!result.success) return;

    dispatch({
      type: EventActions.LOAD_EVENTS,
      payload: result.result,
    });
  };

  const deleteInvite = async (inviteID: string, eventID: string) =>
    dispatch({
      type: EventActions.DELETE_INVITE,
      payload: { inviteID, eventID },
    });

  useEffect(() => {
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
        deleteInvite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
