import React, { createContext, useReducer } from 'react';
import useStorage from '../hooks/useStorage';
import ServerClient from '../clients/serverClient';
import authReducer from '../reducers/authReducer';
import { AuthActions } from '../reducers/reducersTypes';
import { Event } from '../types/types';

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
}

const initialState = {
  isAuthenticated: false,
  username: '',
  id: '',
  loading: false,
  userEvents: [],
  userSignedEvents: [],
};

export const AuthContext = createContext({} as Context);

export const AuthContextProvider: React.FC<Props> = ({
  children,
}) => {
  const { storeData, removeData } = useStorage();
  const [user, dispatch] = useReducer(authReducer, initialState);

  const login = async (values: any) => {
    dispatch({ type: AuthActions.SET_CURRENT_USER_LOADING });

    const data = await ServerClient.loginUser(values);

    if (!data.success) {
      alert(data.message);

      dispatch({ type: AuthActions.END_CURRENT_USER_LOADING });

      return false;
    }

    const { username, _id, token } = data.data.user;

    await storeData(token);

    dispatch({
      type: AuthActions.SET_CURRENT_USER,
      payload: {
        username,
        id: _id,
      },
    });

    ServerClient.setToken(token);

    return true;
  };

  const logout = () => {
    dispatch({ type: AuthActions.LOGOUT_USER });

    ServerClient.removeToken();
    removeData();
  };

  const getUserEvents = async (userId?: string) => {
    const data = await ServerClient.getUserEvents(userId || user.id);

    dispatch({
      type: AuthActions.SET_USER_EVENTS,
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
      type: AuthActions.SET_USER_EVENTS,
      payload: {
        events: data,
        field: 'userSignedEvents',
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getUserEvents,
        getUserSignedEvents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
