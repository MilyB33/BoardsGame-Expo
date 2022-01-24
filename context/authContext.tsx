import React, { createContext, useReducer, useEffect, useContext } from "react";
import useStorage from "../hooks/useStorage";
import ServerClient from "../clients/serverClient";
import authReducer from "../reducers/authReducer";
import { UserContext } from "./userContext";
import { AuthActions, AuthState } from "../reducers/reducersTypes";
import { P } from "../types/types";

interface Props {
  children: React.ReactNode;
}

interface Context {
  authState: AuthState;
  login(data: any): P<boolean>;
  logout(): void;
  deleteAccount(): P;
}

const initialState = {
  isAuthenticated: false,
  username: "",
  _id: "",
  loading: false,
} as AuthState;

export const AuthContext = createContext({} as Context);

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { storeData, removeData } = useStorage();
  const { clearFields, setUserInfo } = useContext(UserContext);

  const login = async (values: any) => {
    dispatch({ type: AuthActions.SET_CURRENT_USER_LOADING });

    const result = await ServerClient.loginUser(values);

    if (!result.success) {
      alert(result.message);

      dispatch({ type: AuthActions.END_CURRENT_USER_LOADING });

      return false;
    }

    const { token } = result.result;

    await storeData(token);

    delete result.result.token;

    dispatch({
      type: AuthActions.LOGIN,
      payload: result.result,
    });

    ServerClient.setToken(token);

    setUserInfo(result.result._id);

    return true;
  };

  const logout = () => {
    removeData();
    clearFields();
    dispatch({ type: AuthActions.LOGOUT });

    ServerClient.setToken("");
  };

  // temporary here to avoid context cycle
  const deleteAccount = async () => {
    const result = await ServerClient.deleteAccount(authState._id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    logout();
  };

  useEffect(() => {
    if (!authState.isAuthenticated)
      login({ username: "Admin", password: "Qwertyuiop12" });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
