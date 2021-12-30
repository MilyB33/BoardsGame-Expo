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
  editEvent(event: EventPayload, eventId: string): Promise<boolean>;
  deleteAccount(): Promise<void>;
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

    const result = await ServerClient.loginUser(values);

    if (!result.success) {
      alert(result.message);

      dispatch({ type: UserActions.END_CURRENT_USER_LOADING });

      return false;
    }

    const { username, _id, token } = result.result;

    await storeData(token);

    dispatch({
      type: UserActions.SET_CURRENT_USER,
      payload: {
        username,
        id: _id,
      },
    });

    ServerClient.setToken(token);

    getUserEvents(_id);
    getUserSignedEvents(_id);

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

    const result = await ServerClient.getUserEvents(
      userId || user.id
    );

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: result.result,
        field: 'userEvents',
      },
    });
  };

  const getUserSignedEvents = async (userId?: string) => {
    dispatch({
      type: UserActions.SET_EVENTS_LOADING,
      payload: { field: 'userSignedEvents' },
    });

    const result = await ServerClient.getUserSignedEvents(
      userId || user.id
    );

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: result.result,
        field: 'userSignedEvents',
      },
    });
  };

  const deleteUserEvent = async (eventId: string) => {
    const result = await ServerClient.deleteUserEvent(
      eventId,
      user.id
    );

    if (!result.success) {
      alert(result.message);
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
    const result = await ServerClient.signUserForEvent(
      eventId,
      user.id
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_USER_TO_EVENT,
      payload: result.result,
    });

    replaceEvent(result.result);
  };

  const signOutUserFromEvent = async (eventId: string) => {
    const result = await ServerClient.signOutUserFromEvent(
      eventId,
      user.id
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_OUT_USER_FROM_EVENT,
      payload: eventId,
    });

    replaceEvent(result.result);
  };

  const addEvent = async (event: EventPayload) => {
    const result = await ServerClient.addEvent(event, user.id);

    if (!result.success) {
      alert(result.message);
      return false;
    }

    dispatch({
      type: UserActions.ADD_EVENT,
      payload: result.result,
    });

    getUserEvents(user.id);

    return true;
  };

  const editEvent = async (event: EventPayload, eventId: string) => {
    const result = await ServerClient.editEvent(
      event,
      user.id,
      eventId
    );

    if (!result.success) {
      alert(result.message);
      return false;
    }

    dispatch({
      type: UserActions.EDIT_EVENT,
      payload: {
        event: result.result,
      },
    });

    replaceEvent(result.result);

    return true;
  };

  const deleteAccount = async () => {
    const result = await ServerClient.deleteAccount(user.id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    logout();
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
        editEvent,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
