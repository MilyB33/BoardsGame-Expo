import React, { createContext, useReducer, useContext } from 'react';
import useStorage from '../hooks/useStorage';
import ServerClient from '../clients/serverClient';
import authReducer from '../reducers/userReducer';
import { UserActions } from '../reducers/reducersTypes';
import { UserState } from '../reducers/reducersTypes';
import { AppContext } from './appContext';
import { EventPayload } from '../types/types';

interface Props {
  children: React.ReactNode;
}

interface Context {
  user: UserState;
  login(data: any): Promise<boolean>;
  logout(): void;
  getUserEvents(userId?: string): Promise<void>;
  getUserSignedEvents(userId?: string): Promise<void>;
  deleteUserEvent(eventId: string): Promise<void>;
  signUserForEvent(eventId: string): Promise<void>;
  signOutUserFromEvent(eventId: string): Promise<void>;
  addEvent(event: EventPayload): Promise<boolean>;
}

const initialState = {
  isAuthenticated: false,
  username: '',
  id: '',
  loading: false,
  events: {
    userEvents: {
      items: [],
      loading: false,
    },
    userSignedEvents: {
      items: [],
      loading: false,
    },
  },
};

export const UserContext = createContext({} as Context);

export const UserContextProvider: React.FC<Props> = ({
  children,
}) => {
  const { storeData, removeData } = useStorage();
  const [user, dispatch] = useReducer(authReducer, initialState);
  const { FilterOutEvent, replaceEvent } = useContext(AppContext);

  const login = async (values: any) => {
    dispatch({ type: UserActions.SET_CURRENT_USER_LOADING });

    const data = await ServerClient.loginUser(values);

    if (!data.success) {
      alert(data.message);

      dispatch({ type: UserActions.END_CURRENT_USER_LOADING });

      return false;
    }

    const { username, _id, token } = data.data.user;

    await storeData(token);

    dispatch({
      type: UserActions.SET_CURRENT_USER,
      payload: {
        username,
        id: _id,
      },
    });

    ServerClient.setToken(token);

    getUserEvents(data.data.user._id);
    getUserSignedEvents(data.data.user._id);

    return true;
  };

  const logout = () => {
    dispatch({ type: UserActions.LOGOUT_USER });

    ServerClient.removeToken();
    removeData();
  };

  const getUserEvents = async (userId?: string) => {
    dispatch({
      type: UserActions.SET_EVENTS_LOADING,
      payload: { field: 'userEvents' },
    });

    const data = await ServerClient.getUserEvents(userId || user.id);

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: data,
        field: 'userEvents',
      },
    });
  };

  const getUserSignedEvents = async (userId?: string) => {
    dispatch({
      type: UserActions.SET_EVENTS_LOADING,
      payload: { field: 'userSignedEvents' },
    });

    const data = await ServerClient.getUserSignedEvents(
      userId || user.id
    );

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: data,
        field: 'userSignedEvents',
      },
    });
  };

  const deleteUserEvent = async (eventId: string) => {
    const data = await ServerClient.deleteUserEvent(eventId, user.id);

    if (!data.success) {
      alert(data.message);
      return;
    }

    dispatch({
      type: UserActions.DELETE_EVENT,
      payload: {
        eventId,
        field: 'userEvents',
      },
    });

    FilterOutEvent(eventId);
  };

  const signUserForEvent = async (eventId: string) => {
    const data = await ServerClient.signUserForEvent(
      eventId,
      user.id
    );

    if (!data.success) {
      alert(data.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_USER_TO_EVENT,
      payload: data.data,
    });

    replaceEvent(data.data);
  };

  const signOutUserFromEvent = async (eventId: string) => {
    const data = await ServerClient.signOutUserFromEvent(
      eventId,
      user.id
    );

    if (!data.success) {
      alert(data.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_OUT_USER_FROM_EVENT,
      payload: eventId,
    });

    replaceEvent(data.data);
  };

  const addEvent = async (event: EventPayload) => {
    const data = await ServerClient.addEvent(event, user.id);

    if (!data.success) {
      alert(data.message);
      return false;
    }

    dispatch({
      type: UserActions.ADD_EVENT,
      payload: data.data,
    });

    getUserEvents(user.id);

    return true;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        getUserEvents,
        getUserSignedEvents,
        deleteUserEvent,
        signUserForEvent,
        signOutUserFromEvent,
        addEvent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
