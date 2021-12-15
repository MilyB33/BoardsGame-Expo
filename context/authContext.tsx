import React, { createContext, useState } from 'react';
import useStorage from '../hooks/useStorage';
import ServerClient from '../clients/serverClient';

interface Props {
  children: React.ReactNode;
}

interface State {
  isAuthenticated: boolean;
  username: string;
  id: string;
  loading: boolean;
}

interface Context {
  user: State;
  login(data: any): Promise<boolean>;
  logout(): void;
}

export const AuthContext = createContext({} as Context);

export const AuthContextProvider: React.FC<Props> = ({
  children,
}) => {
  const { storeData, removeData } = useStorage();

  const [user, setUser] = useState({
    isAuthenticated: false,
    username: '',
    id: '',
    loading: false,
  });

  const login = async (values: any) => {
    const data = await ServerClient.loginUser(values);

    if (!data.success) {
      alert(data.message);
      return false;
    }

    const { username, _id, token } = data.data.user;

    setUser({
      ...user,
      loading: true,
    });

    await storeData(token);

    setUser({
      isAuthenticated: true,
      username,
      id: _id,
      loading: false,
    });

    ServerClient.setToken(token);

    return true;
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      username: '',
      id: '',
      loading: false,
    });

    ServerClient.removeToken();
    removeData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
