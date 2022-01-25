import React, { createContext, useReducer, useContext, useEffect } from "react";
import useStorage from "../hooks/useStorage";
import ServerClient from "../clients/serverClient";
import authReducer from "../reducers/userReducer";
import { UserActions, UserState } from "../reducers/reducersTypes";
import { AppContext } from "./appContext";
import { EventPayload, P } from "../types/types";

interface Props {
  children: React.ReactNode;
}

interface Context {
  userState: UserState;
  login(data: any): P<boolean>;
  logout(): void;
  deleteAccount(): P;
  deleteUserEvent(eventId: string): P;
  signUserForEvent(eventId: string): P;
  signOutUserFromEvent(eventId: string): P;
  addEvent(event: EventPayload): P<boolean>;
  editEvent(event: EventPayload, eventId: string): P<boolean>;
  updatePassword(newPassword: { oldPassword: string; newPassword: string }): P;
  sendFriendRequest(requestedUserId: string): P;
  acceptFriendRequest(requestedUserId: string): P;
  rejectFriendRequest(requestedUserId: string): P;
  deleteFriend(requestedUserId: string): P;
  sendEventRequest(eventId: string, requestedUserID: string): P;
  rejectEventRequest(inviteID: string, eventID: string): P;
  acceptEventRequest(inviteID: string, eventID: string): P;
}

const initialState = {
  isAuthenticated: false,
  username: "",
  _id: "",
  loading: false,
  events: {
    userEvents: [],
    userSignedEvents: [],
    userInvitedEvents: [],
  },
  friends: [],
  friendsRequests: {
    sent: [],
    received: [],
  },
  eventsRequests: {
    sent: [],
    received: [],
  },
} as UserState;

export const UserContext = createContext({} as Context);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userState, dispatch] = useReducer(authReducer, initialState);
  const { storeData, removeData } = useStorage();
  const { FilterOutEvent, replaceEvent, deleteInvite } = useContext(AppContext);

  const login = async (values: any) => {
    dispatch({ type: UserActions.SET_CURRENT_USER_LOADING });

    const result = await ServerClient.loginUser(values);

    if (!result.success) {
      alert(result.message);

      dispatch({ type: UserActions.END_CURRENT_USER_LOADING });

      return false;
    }

    const { token } = result.result;

    await storeData(token);

    delete result.result.token;

    ServerClient.setToken(token);

    const userData = await ServerClient.getUserInfo(result.result._id);

    if (!userData.success) {
      alert(userData.message);

      dispatch({ type: UserActions.END_CURRENT_USER_LOADING });

      return false;
    }

    dispatch({
      type: UserActions.LOGIN,
      payload: {
        ...result.result,
        ...userData.result,
      },
    });

    return true;
  };

  const logout = () => {
    removeData();
    dispatch({ type: UserActions.LOGOUT });

    ServerClient.setToken("");
  };

  const deleteAccount = async () => {
    const result = await ServerClient.deleteAccount(userState._id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    logout();
  };

  const deleteUserEvent = async (eventId: string) => {
    const result = await ServerClient.deleteUserEvent(eventId, userState._id);

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
    const result = await ServerClient.signUserForEvent(eventId, userState._id);

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
      userState._id
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
    const result = await ServerClient.addEvent(event, userState._id);

    if (!result.success) {
      alert(result.message);
      return false;
    }

    dispatch({
      type: UserActions.ADD_EVENT,
      payload: result.result,
    });

    return true;
  };

  const editEvent = async (event: EventPayload, eventId: string) => {
    const result = await ServerClient.editEvent(event, userState._id, eventId);

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

  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const result = await ServerClient.updatePassword(userState._id, data);

    if (!result.success) {
      alert(result.message);
      return;
    }
  };

  const sendFriendRequest = async (requestedUserId: string) => {
    const result = await ServerClient.sendFriendRequest(
      userState._id,
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

  const acceptFriendRequest = async (requestId: string) => {
    const result = await ServerClient.acceptFriendRequest(
      userState._id,
      requestId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.ACCEPT_FRIEND_REQUEST,
      payload: result.result,
    });
  };

  const rejectFriendRequest = async (requestId: string) => {
    const result = await ServerClient.rejectFriendRequest(
      userState._id,
      requestId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.REJECT_FRIEND_REQUEST,
      payload: requestId,
    });
  };

  const deleteFriend = async (friendId: string) => {
    const result = await ServerClient.deleteFriend(userState._id, friendId);

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.DELETE_FRIEND,
      payload: friendId,
    });
  };

  const sendEventRequest = async (eventId: string, requestedUserID: string) => {
    const result = await ServerClient.sendEventInvite(
      userState._id,
      eventId,
      requestedUserID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SEND_EVENT_REQUEST,
      payload: result.result,
    });
  };

  const rejectEventRequest = async (inviteID: string, eventID: string) => {
    const result = await ServerClient.rejectEventInvite(
      userState._id,
      inviteID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.REJECT_EVENT_REQUEST,
      payload: inviteID,
    });

    deleteInvite(inviteID, eventID);
  };

  const acceptEventRequest = async (inviteID: string, eventID: string) => {
    const result = await ServerClient.acceptEventInvite(
      userState._id,
      inviteID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.ACCEPT_EVENT_REQUEST,
      payload: {
        inviteID,
        event: result.result,
      },
    });

    replaceEvent(result.result);
  };

  useEffect(() => {
    if (!userState.isAuthenticated) {
      login({ username: "Admin", password: "Qwertyuiop12" });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        login,
        logout,
        deleteAccount,
        deleteUserEvent,
        signUserForEvent,
        signOutUserFromEvent,
        addEvent,
        editEvent,
        updatePassword,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        deleteFriend,
        sendEventRequest,
        rejectEventRequest,
        acceptEventRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
