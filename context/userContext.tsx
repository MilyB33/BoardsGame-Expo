import React, { createContext, useReducer, useContext } from 'react';
import useStorage from '../hooks/useStorage';
import ServerClient from '../clients/serverClient';
import authReducer from '../reducers/userReducer';
import { UserActions } from '../reducers/reducersTypes';
import { Event } from '../types/types';
import { AppContext } from './appContext';

interface Props {
  children: React.ReactNode;
}

interface State {
  isAuthenticated: boolean;
  username: string;
  id: string;
  loading: boolean;
  userEvents: Event[];
  userSignedEvents: Event[];
}

interface Context {
  user: State;
  login(data: any): Promise<boolean>;
  logout(): void;
  getUserEvents(userId?: string): Promise<void>;
  getUserSignedEvents(userId?: string): Promise<void>;
  deleteUserEvent(eventId: string): Promise<void>;
}

const initialState = {
  isAuthenticated: false,
  username: '',
  id: '',
  loading: false,
  userEvents: [],
  userSignedEvents: [],
};

export const UserContext = createContext({} as Context);

export const UserContextProvider: React.FC<Props> = ({
  children,
}) => {
  const { storeData, removeData } = useStorage();
  const [user, dispatch] = useReducer(authReducer, initialState);
  const { deleteEvent } = useContext(AppContext);

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

    return true;
  };

  const logout = () => {
    dispatch({ type: UserActions.LOGOUT_USER });

    ServerClient.removeToken();
    removeData();
  };

  const getUserEvents = async (userId?: string) => {
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

  const deleteUserEvent = async (
    eventId: string,
    userId?: string
  ) => {
    const data = await ServerClient.deleteUserEvent(
      eventId,
      userId || user.id
    );

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

    deleteEvent(eventId);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
