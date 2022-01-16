import React, { createContext, useReducer, useContext, useEffect } from "react";
import useStorage from "../hooks/useStorage";
import ServerClient from "../clients/serverClient";
import authReducer from "../reducers/userReducer";
import { UserActions } from "../reducers/reducersTypes";
import { UserState } from "../reducers/reducersTypes";
import { AppContext } from "./appContext";
import { EventPayload, P } from "../types/types";

interface Props {
  children: React.ReactNode;
}

interface Context {
  user: UserState;
  login(data: any): P<boolean>;
  logout(): void;
  getUserEvents(userId?: string): P;
  getUserSignedEvents(userId?: string): P;
  deleteUserEvent(eventId: string): P;
  signUserForEvent(eventId: string): P;
  signOutUserFromEvent(eventId: string): P;
  addEvent(event: EventPayload): P<boolean>;
  editEvent(event: EventPayload, eventId: string): P<boolean>;
  deleteAccount(): P;
  updatePassword(newPassword: { oldPassword: string; newPassword: string }): P;
  sendFriendRequest(requestedUserId: string): P;
}

const initialState = {
  isAuthenticated: false,
  username: "",
  id: "",
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
  friends: [],
  friendsRequests: {
    sent: [],
    received: [],
  },
} as UserState;

export const UserContext = createContext({} as Context);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
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

    const { _id, token } = result.result;

    await storeData(token);

    delete result.result.token;
    delete result.result.password;

    dispatch({
      type: UserActions.SET_CURRENT_USER,
      payload: result.result,
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
      payload: { field: "userEvents" },
    });

    const result = await ServerClient.getUserEvents(userId || user.id);

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: result.result,
        field: "userEvents",
      },
    });
  };

  const getUserSignedEvents = async (userId?: string) => {
    dispatch({
      type: UserActions.SET_EVENTS_LOADING,
      payload: { field: "userSignedEvents" },
    });

    const result = await ServerClient.getUserSignedEvents(userId || user.id);

    dispatch({
      type: UserActions.SET_USER_EVENTS,
      payload: {
        events: result.result,
        field: "userSignedEvents",
      },
    });
  };

  const deleteUserEvent = async (eventId: string) => {
    const result = await ServerClient.deleteUserEvent(eventId, user.id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.DELETE_EVENT,
      payload: {
        eventId,
        field: "userEvents",
      },
    });

    FilterOutEvent(eventId);
  };

  const signUserForEvent = async (eventId: string) => {
    const result = await ServerClient.signUserForEvent(eventId, user.id);

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
    const result = await ServerClient.signOutUserFromEvent(eventId, user.id);

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
    const result = await ServerClient.editEvent(event, user.id, eventId);

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

  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const result = await ServerClient.updatePassword(user.id, data);

    if (!result.success) {
      alert(result.message);
      return;
    }
  };

  const sendFriendRequest = async (requestedUserId: string) => {
    const result = await ServerClient.sendFriendRequest(
      user.id,
      requestedUserId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SEND_FRIEND_REQUEST,
      payload: result.result,
    });
  };

  useEffect(() => {
    if (!user.isAuthenticated)
      login({ username: "Admin", password: "Qwertyuiop12" });
  }, []);

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
        updatePassword,
        sendFriendRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
