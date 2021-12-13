import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  isAuthenticated: boolean;
  username: string;
  id: string;
}

interface Context {
  user: State;
  login(data: any): void;
  logout(): void;
}

export const AuthContext = createContext({} as Context);

export const AuthContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    username: '',
    id: '',
  });

  const login = (data: any) => {
    const { username, _id } = data;

    setUser({
      isAuthenticated: true,
      username,
      id: _id,
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      username: '',
      id: '',
    });
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
